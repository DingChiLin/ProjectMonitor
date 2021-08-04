require('dotenv').config();
const {BATCH} = process.env;

const students = [
    {
        batch: BATCH,
        name: 'lindingchi',
        github_name: 'DingChiLin',
        email: 'gn01168178@yahoo.com.tw',
        github_link: 'https://github.com/DingChiLin',
        server: 'http://13.230.176.178',
    },
    {
        batch: BATCH,
        name: 'arthur',
        github_name: 'ArthurLinDev',
        email: 'lindingchi@gmail.com',
        github_link: 'https://github.com/ArthurLinDev',
        server: 'http://13.230.176.178',

    }
];

const assignments = [
    {
        batch: BATCH,
        part: 1,
        name: 'week_0_part_1'
    },
    {
        batch: BATCH,
        part: 2,
        name: 'week_0_part_2'
    },
    {
        batch: BATCH,
        part: 3,
        name: 'week_0_part_3'
    },
    {
        batch: BATCH,
        part: 4,
        name: 'week_1_part_1'
    },
    {
        batch: BATCH,
        part: 5,
        name: 'week_1_part_2'
    },
    {
        batch: BATCH,
        part: 6,
        name: 'week_1_part_3'
    },
    {
        batch: BATCH,
        part: 7,
        name: 'week_1_part_4'
    },
    {
        batch: BATCH,
        part: 8,
        name: 'week_1_part_5'
    }
]

const status = [
    {
        name: 'checked'
    },
    {
        name: 'error'
    },
    {
        name: 'passed'
    },
    {
        name: 'closed'
    },
]

const progresses = [

]

module.exports = {
    students,
    assignments,
    status,
    progresses
}