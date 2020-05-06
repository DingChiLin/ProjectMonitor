const moment = require('moment');

const students = [
    {
        batch: 11,
        name: 'lindingchi',
        github_name: 'DingChiLin',
        email: 'gn01168178@yahoo.com.tw',
        github_link: 'https://github.com/DingChiLin',
        server: 'http://13.113.12.180',
    },
    {
        batch: 11,
        name: 'arthur',
        github_name: 'ArthurLinDev',
        email: 'lindingchi@gmail.com',
        github_link: 'https://github.com/ArthurLinDev',
        server: 'http://13.113.12.180',
    },
    {
        batch: 11,
        name: 'viola',
        github_name: 'violachyu',
        email: 'pinckychyu@gmail.com',
        github_link: 'https://github.com/violachyu',
        server: '',
    },
    {
        batch: 11,
        name: 'loooffy',
        github_name: 'Loooffy',
        email: 'loooffy@gmail.com',
        github_link: 'https://github.com/Loooffy',
        server: '',
    },
    {
        batch: 11,
        name: 'sandi',
        github_name: 'sandiwu0318',
        email: 'sandiwu0318@gmail.com',
        github_link: 'https://github.com/sandiwu0318',
        server: '',
    },
    {
        batch: 11,
        name: 'chris',
        github_name: 'yuanchris',
        email: 'yuanchris1@gmail.com',
        github_link: 'https://github.com/yuanchris',
        server: '',
    },
    {
        batch: 11,
        name: 'pual',
        github_name: 'dadamu',
        email: 'p22626262@gmail.com',
        github_link: 'https://github.com/dadamu',
        server: '',
    },
    {
        batch: 11,
        name: 'tim',
        github_name: 'TimMKChang',
        email: 'b00501007@gmail.com',
        github_link: 'https://github.com/TimMKChang',
        server: '',
    },
    {
        batch: 11,
        name: 'loris',
        github_name: 'white-100',
        email: 't100210022002@gmail.com',
        github_link: 'https://github.com/white-100',
        server: '',
    },
    {
        batch: 11,
        name: 'raymond',
        github_name: 'Hsieh-Huai-Wei',
        email: 'waterman0116@gmail.com',
        github_link: 'https://github.com/Hsieh-Huai-Wei',
        server: '',
    },
    {
        batch: 11,
        name: 'john',
        github_name: 'JohnC-92',
        email: 'chongxz@solab.me.ntu.edu.tw',
        github_link: 'https://github.com/JohnC-92',
        server: '',
    },
    {
        batch: 11,
        name: 'inch',
        github_name: 'Inchtw',
        email: 'ashin1207@gmail.com',
        github_link: 'https://github.com/Inchtw',
        server: '',
    },
    {
        batch: 11,
        name: 'yen_chen',
        github_name: 'yk9331',
        email: 'yenchenkuo9331@gmail.com',
        github_link: 'https://github.com/yk9331',
        server: '',
    },
    {
        batch: 11,
        name: 'tanya',
        github_name: 'tanyachuang94',
        email: 'yoshikachuang@gmail.com',
        github_link: 'https://github.com/tanyachuang94',
        server: '',
    },
    {
        batch: 11,
        name: 'jian_ting',
        github_name: 'jtjin',
        email: 'wade4515x@gmail.com',
        github_link: 'https://github.com/jtjin',
        server: '',
    },
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
        name: 'week_0_part_3',
        route: '/admin/product.html'
    },
    {
        batch: 11,
        part: 4,
        name: 'week_1_part_1',
        route: '/api/1.0/products/all'
    },
    {
        batch: 11,
        part: 5,
        name: 'week_1_part_2',
        route: encodeURI('/api/1.0/products/search?keyword=洋裝')
    },
    {
        batch: 11,
        part: 6,
        name: 'week_1_part_3',
        route: '/admin/campaign.html'
    },
    {
        batch: 11,
        part: 7,
        name: 'week_1_part_4',
    },
    {
        batch: 11,
        part: 8,
        name: 'week_1_part_5'
    },
    {
        batch: 11,
        part: 9,
        name: 'week_2_part_1',
        route: '/admin/checkout.html'
    },
    {
        batch: 11,
        part: 10,
        name: 'week_2_part_2',
        route: '/admin/checkout.html'
    },
    {
        batch: 11,
        part: 11,
        name: 'week_2_part_3',
        route: '/index.html'
    },
    {
        batch: 11,
        part: 12,
        name: 'week_2_part_4',
        route: '/product.html?id=1'
    },
    {
        batch: 11,
        part: 13,
        name: 'week_2_part_5',
        route: '/profile.html'
    },
    {
        batch: 11,
        part: 14,
        name: 'week_3_part_1'
    },
    {
        batch: 11,
        part: 15,
        name: 'week_3_part_2'
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
        pr_link: 'https://github.com/DingChiLin/ProjectMonitor/pull/1',
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
