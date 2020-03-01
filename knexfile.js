require('dotenv').config();
console.log("?")
console.log(process.env.NODE_ENV)
module.exports = {
    development: {
        client: 'mysql',
        connection: process.env.DATABASE_URL
    },
};
