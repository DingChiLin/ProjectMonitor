require('dotenv').config();
const moment = require('moment');
const Monitor = require('../models/monitor_model');
const Validator = require("../helper/assignment_validator");
const rp = require("request-promise");
const {BATCH, GITHUB_TOKEN} = process.env;

const getProgresses = async (req, res) => {
    const {batch} = req.params || BATCH;

    const students = await Monitor.getStudents(batch);
    const assignments = await Monitor.getAssignments(batch);
    const progresses = await Monitor.getProgresses(students.map(s => s.id));
    const status = await Monitor.getStatus();

    res.status(200).json({students, assignments, progresses, status});
}

async function parseGithubPayload(payload, validateType) {
    let detail;
    if (validateType == 'pull_request') {
        detail = payload.pull_request;
        const baseBranch = detail.base.ref.toLowerCase();
        const compareBranch = detail.head.ref.toLowerCase();

        const student = await Monitor.getStudentByGitHubName(BATCH, detail.user.login);
        const studentBranch = student.name.toLowerCase() + '_develop';
        // 1. check base branch (should be <student_name>_develop)
        if (baseBranch != studentBranch) {
            console.log(`base branch should be: ${studentBranch}}`);
            throw Error(`{error: base branch should be **${studentBranch}**, note: please **Close** this pull request and create a new one}`);
        }

        // 2. check compare branch (should be week_x_part_y and can be found in DB in this batch)
        const assignment = await Monitor.getAssignmentByName(BATCH, compareBranch);
        if (!assignment) {
            throw Error(`{error: compare branch name should be **week_n_part_m**, note: please **Close** this pull request and create a new one}`)
        }
        detail.student = student;
        detail.assignment = assignment;
    } else if (validateType == 'comment') {
        detail = payload.comment;
        const student = await Monitor.getStudentByGitHubName(BATCH, detail.user.login);
        const prLink = payload.issue.html_url;

        // 1. find progress
        const progress = await Monitor.getProgressByPRLink(prLink);
        if (!progress) {
            throw Error(`{error: comment on a wrong pull request, note: please contact Arthur for this problem}`);
        }
        
        const assignment = await Monitor.getAssignmentById(progress.assignment_id);

        detail.student = student;
        detail.assignment = assignment;
        detail.progress = progress;
    }

    return {
        repository: payload.repository.name,
        prLink: detail.html_url,
        student: detail.student,
        assignment: detail.assignment,
        progress: detail.progress,
    }
}

const addProgresses = async (req, res) => {
    const payload = JSON.parse(req.body.payload);
    let uri;
    let validateType;
    if (payload.pull_request) {
        uri = payload.pull_request.issue_url + '/comments';
        validateType = 'pull_request';
    } else if (payload.comment && payload.comment.body.toLowerCase().trim() == 'fixed') {
        uri = payload.comment.issue_url + '/comments';
        validateType = 'comment';
    } else {
        return
    }

    // 1. parse payload
    let data;
    try {
        data = await parseGithubPayload(payload, validateType);
        console.log(data);
    } catch (e) {
        console.log(e.message);
        await postComment(uri, e.message);
    }

    // 2. validate
    const validResult = await Validator.validate(data.assignment.part, data.student.server);
    console.log(validResult);

    // 3. save change to DB
    if (validateType == 'pull_request') {
        const progress = {
            student_id: data.student.id,
            assignment_id: data.assignment.id,
            pr_link: data.prLink,
            status_id: validResult.status, //checked
            // TODO: how to add url_link for convenience?
        }
        Monitor.createProgress(progress);
    } else if (validateType == 'comment') {
        await Monitor.updateProgressStatus(data.progress.id, validResult.status);
    }

    // 4. post result
    await postComment(uri, validResult.message);

    res.json({data: "OK"})
}

async function postComment(uri, content) {
    console.log(uri);
    const headers = {
        'User-Agent': 'request',
        Authorization: `token ${GITHUB_TOKEN}`
    }
    const body = JSON.stringify({"body": content});
    await rp({method: 'POST', uri, body: body, headers});
}

module.exports = {
    getProgresses,
    addProgresses
}