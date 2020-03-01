require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const knexfile = require('../../knexfile');
console.log(process.env.DATABASE_URL)
console.log(knexfile);
console.log(env);
const knex = require('knex')(knexfile[env]);

module.exports = knex;
