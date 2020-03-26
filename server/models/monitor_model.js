const knex = require('./database');
const moment = require('moment');

const getStudents = async (batch) => {
    const students = await knex('students')
        .where("batch", batch);

    return students;
}

const getAssignments = async (batch) => {
    const assignments = await knex('assignments')
        .where("batch", batch);

    return assignments;
}

const getProgresses = async (studentIds) => {
    const progresses = await knex('progresses')
        .whereIn("student_id", studentIds)
        .orderBy(["student_id", "assignment_id"]);

    return progresses;
}

const getStatus = async () => {
    const status = await knex('status');
    return status;
}

module.exports = {
    getStudents,
    getAssignments,
    getProgresses,
    getStatus
}