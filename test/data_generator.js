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

    // console.log('truncate fake data');
    // const setForeignKey = (status) => {
    //     return query('SET FOREIGN_KEY_CHECKS = ?', status);
    // };

    // const truncateTable = (table) => {
    //     return query(`TRUNCATE TABLE ${table}`);
    // };

    await knex('students').truncate();
    await knex('assignments').truncate();
    await knex('status').truncate();
    await knex('progresses').truncate();

    // return setForeignKey(0)
    //     .then(truncateTable('students'))
    //     .then(truncateTable('assignments'))
    //     .then(truncateTable('status'))
    //     .then(truncateTable('progresses'))
    //     .then(setForeignKey(1))
    //     .catch(console.log);
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