const moment = require('moment');

const students = [
    {
        batch: 11,
        name: 'arthur',
        email: 'gn01168178@yahoo.com.tw',
        github_link: 'https://github.com/DingChiLin',
        server: 'http://13.113.12.180',
    },
    {
        batch: 11,
        name: 'arthur2',
        email: 'gn01168178@yahoo.com.tw',
        github_link: 'https://github.com/DingChiLin',
        server: 'http://13.113.12.180',

    },
    {
        batch: 11,
        name: 'arthur3',
        email: 'gn01168178@yahoo.com.tw',
        github_link: 'https://github.com/DingChiLin',
        server: 'http://13.113.12.180',
    },
    {
        batch: 11,
        name: 'arthur4',
        email: 'gn01168178@yahoo.com.tw',
        github_link: 'https://github.com/DingChiLin',
        server: 'http://13.113.12.180',
    }
];

const assignments = [
    {
        batch: 11,
        part: 1,
        name: 'week_0_part_1'
    },
    {
        batch: 11,
        part: 2,
        name: 'week_0_part_2'
    },
    {
        batch: 11,
        part: 3,
        name: 'week_0_part_3'
    },
    {
        batch: 11,
        part: 4,
        name: 'week_1_part_1'
    },
    {
        batch: 11,
        part: 5,
        name: 'week_1_part_2'
    },
    {
        batch: 11,
        part: 6,
        name: 'week_1_part_3'
    },
    {
        batch: 11,
        part: 7,
        name: 'week_1_part_4'
    },
    {
        batch: 11,
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
]

const progresses = [
    {
        student_id: 1,
        assignment_id: 4,
        pr_link: 'https://github.com/DingChiLin/Web-Backend-2019-Winter',
        latest_committed_at: new Date(),
        status_id: 3,
        finished_at: new Date(),
    },
    {
        student_id: 1,
        assignment_id: 5,
        pr_link: 'https://github.com/DingChiLin/Web-Backend-2019-Winter/tree/master/students',
        latest_committed_at: new Date(),
        status_id: 3,
        finished_at: new Date(),
    },
    {
        student_id: 1,
        assignment_id: 6,
        pr_link: 'https://github.com/DingChiLin/Web-Backend-2019-Winter/tree/master/students/elvin',
        latest_committed_at: new Date(),
        status_id: 1,
    },
    {
        student_id: 2,
        assignment_id: 4,
        pr_link: 'https://github.com/DingChiLin/remote-assignments',
        latest_committed_at: new Date(),
        status_id: 3,
        finished_at: new Date(),
    },
    {
        student_id: 3,
        assignment_id: 4,
        pr_link: 'https://github.com/DingChiLin/remote-assignments/tree/master/Week-1/Assignment-2',
        latest_committed_at: new Date(),
        status_id: 2,
    },
]

module.exports = {
    students,
    assignments,
    status,
    progresses
}
