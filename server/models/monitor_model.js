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
    const progresses = await knex('progresses')
        .insert(progress);

    return progresses;
}

const updateProgressStatus = async (id, status_id) => {
    await knex('progresses')
        .where('id', id)
        .update({
            status_id
        });
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
    updateProgressStatus,
    getProgresses,
    getProgressByPRLink,
    getStatus
}