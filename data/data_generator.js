require('dotenv').config();
const knex = require('../server/models/database');

const {
    students,
    assignments,
    status,
    progresses
} = require('./data_batch_11');

async function createFakeData() {
    await knex('students').insert(students);
    await knex('assignments').insert(assignments);
    await knex('status').insert(status);
    await knex('progresses').insert(progresses);
}

async function finishConnection() {
    await knex.destroy();
}

async function main() {
    try {
        await createFakeData();
        await finishConnection();
    } catch (e) {
        console.log(e);
    }
}

// execute when called directly.
if (require.main === module) {
    main();
}

module.exports = {
    finishConnection,
    createFakeData
};