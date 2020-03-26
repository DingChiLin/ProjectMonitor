require('dotenv').config();
module.exports = {
    development: {
        client: 'mysql',
        connection: process.env.DATABASE_URL
    },
};
