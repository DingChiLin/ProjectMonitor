const knex = require('./database');
const moment = require('moment');

const getStudents = async (batch) => {
    const students = await knex('students')
        .where("batch", batch);

    return students;
}

const getStudentByGitHubName = async (batch, githubName) => {
    const students = await knex('students')
        .where({
            batch,
            github_name: githubName
        });
    return students[0];
}

const getAssignments = async (batch) => {
    const assignments = await knex('assignments')
        .where("batch", batch);

    return assignments;
}

const getAssignmentByName = async (batch, compareBranch) => {
    const assignments = await knex('assignments')
        .where({
            batch,
            name: compareBranch
        });
    return assignments[0];
}

const getAssignmentById = async (id) => {
    const assignments = await knex('assignments')
        .where("id", id);

    return assignments[0];
}

const createProgress = async (progress) => {
    const progresses = await knex.raw(
        `INSERT INTO progresses (student_id, assignment_id, pr_link, status_id) VALUES (?)
         ON DUPLICATE KEY UPDATE
         pr_link = ?, status_id = ?
        `,
        [
            Object.values(progress),
            progress.pr_link,
            progress.status_id
        ]
    )
    return progresses;
}

const updateProgress = async (id, update) => {
    await knex('progresses')
        .where('id', id)
        .update(update);
}

const deleteProgress = async (id) => {
    await knex('progresses')
        .where('id', id)
        .del();
}

const getProgresses = async (studentIds) => {
    const progresses = await knex('progresses')
        .whereIn("student_id", studentIds)
        .orderBy(["student_id", "assignment_id"]);

    return progresses;
}

const getProgressByPRLink = async (prLink) => {
    const assignments = await knex('progresses')
        .where("pr_link", prLink);

    return assignments[0];
}

const getStatus = async () => {
    const status = await knex('status');
    return status;
}

module.exports = {
    getStudents,
    getStudentByGitHubName,
    getAssignments,
    getAssignmentByName,
    getAssignmentById,
    createProgress,
    updateProgress,
    deleteProgress,
    getProgresses,
    getProgressByPRLink,
    getStatus
}