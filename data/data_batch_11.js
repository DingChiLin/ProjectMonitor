const moment = require('moment');

const students = [
    {
        batch: 11,
        name: 'arthur',
        email: 'gn01168178@yahoo.com.tw',
        github_link: 'https://github.com/DingChiLin',
    },
    {
        batch: 11,
        name: 'arthur2',
        email: 'gn01168178@yahoo.com.tw',
        github_link: 'https://github.com/DingChiLin',
    },
    {
        batch: 11,
        name: 'arthur3',
        email: 'gn01168178@yahoo.com.tw',
        github_link: 'https://github.com/DingChiLin',
    }
];

const assignments = [
    {
        batch: 11,
        type: 'remote',
        part: 1
    },
    {
        batch: 11,
        type: 'remote',
        part: 2
    },
    {
        batch: 11,
        type: 'remote',
        part: 3
    },
    {
        batch: 11,
        type: 'onsite',
        part: 1
    },
    {
        batch: 11,
        type: 'onsite',
        part: 2
    },
    {
        batch: 11,
        type: 'onsite',
        part: 3
    },
    {
        batch: 11,
        type: 'onsite',
        part: 4
    }
]

module.exports = {
    students,
    assignments
}
