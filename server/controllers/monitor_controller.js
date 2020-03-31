const moment = require('moment');
const Monitor = require('../models/monitor_model');

const getProgresses = async (req, res) => {
    const {batch} = req.params;

    const students = await Monitor.getStudents(batch);
    const assignments = await Monitor.getAssignments(batch);
    const progresses = await Monitor.getProgresses(students.map(s => s.id));
    const status = await Monitor.getStatus();

    res.status(200).json({students, assignments, progresses, status});
}

function parseGithubPRPayload(payload) {
    const pullRequest = payload.pull_request;
    return {
        repository: payload.repository.name,
        pr_link: pullRequest.html_url,
        student: pullRequest.head.user.login,
        assignmentPart: pullRequest.head.ref,
        baseBranch: pullRequest.base.ref
    }
}

const addProgresses = async (req, res) => {
    console.log(req.body.payload);
    const payload = JSON.parse(req.body.payload);
    const data = (payload.pull_request) ? parseGithubPRPayload(payload) : null;

    console.log(data);
    res.json({data: "OK add progress"})
}

module.exports = {
    getProgresses,
    addProgresses
}