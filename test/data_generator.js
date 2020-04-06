require('dotenv').config();
const knex = require('../server/models/database');
const {NODE_ENV} = process.env;

const {
    students,
    assignments,
    status,
    progresses
} = require('./data');

async function createFakeData() {
    await knex('students').insert(students);
    await knex('assignments').insert(assignments);
    await knex('status').insert(status);
    await knex('progresses').insert(progresses);
}

async function truncateFakeData() {
    if (NODE_ENV !== 'test') {
        console.log('Not in test env');
        return;
    }
    await knex('students').truncate();
    await knex('assignments').truncate();
    await knex('status').truncate();
    await knex('progresses').truncate();
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
    truncateFakeData,
    finishConnection,
    createFakeData
};