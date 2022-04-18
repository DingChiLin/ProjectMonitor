const moment = require('moment');
const BATCH_ID = 16;

const students = [
    // Myself
    {
        batch: BATCH_ID,
        name: 'lindingchi',
        github_name: 'DingChiLin',
        email: 'gn01168178@yahoo.com.tw',
        server: 'http://35.75.145.100',
    },
    {
        batch: BATCH_ID,
        name: 'arthur',
        github_name: 'ArthurLinDev',
        email: 'lindingchi@gmail.com',
        server: 'http://35.75.145.100',
    },

    // Back-End
    {
        batch: BATCH_ID,
        name: 'hao_yu',
        github_name: 'siddwang827',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'je_ru',
        github_name: 'JRL135',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'kelly',
        github_name: 'KellyChen8411',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'lisa',
        github_name: 'lisa-0831',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'tina',
        github_name: 'lai85321',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'carl',
        github_name: 'expect04199',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'jason',
        github_name: 'ChihJenYu',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'jimmy',
        github_name: 'JIMMYOOOPS',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'thomas',
        github_name: 'thomas-chiang',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'wei_lin',
        github_name: 'weilincheng',
        email: '',
        server: '',
    },

    // Data
    {
        batch: BATCH_ID,
        name: 'jeff',
        github_name: 's9012126000',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'sin_rung',
        github_name: 'anian5005',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'alfred',
        github_name: 'MyDataKitchen',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'dorothy',
        github_name: 'Doro-Chau',
        email: '',
        server: '',
    },
    {
        batch: BATCH_ID,
        name: 'aaron',
        github_name: '870209',
        email: '',
        server: '',
    },
];

const assignments = [
    {
        batch: BATCH_ID,
        part: 1,
        name: 'week_0_part_1',
        deadline: '2022-04-20',
    },
    {
        batch: BATCH_ID,
        part: 2,
        name: 'week_0_part_2',
        deadline: '2022-04-21',
    },
    {
        batch: BATCH_ID,
        part: 3,
        name: 'week_0_part_3',
        route: '/admin/product.html',
        deadline: '2022-04-22',
    },
    {
        batch: BATCH_ID,
        part: 4,
        name: 'week_1_part_1',
        route: '/api/1.0/products/all',
        deadline: '2022-04-25',
    },
    {
        batch: BATCH_ID,
        part: 5,
        name: 'week_1_part_2',
        route: encodeURI('/api/1.0/products/search?keyword=洋裝'),
        deadline: '2022-04-26',
    },
    {
        batch: BATCH_ID,
        part: 6,
        name: 'week_1_part_3',
        route: '/admin/campaign.html',
        deadline: '2022-04-27',
    },
    {
        batch: BATCH_ID,
        part: 7,
        name: 'week_1_part_4',
        deadline: '2022-04-28',
    },
    {
        batch: BATCH_ID,
        part: 8,
        name: 'week_1_part_5',
        deadline: '2022-04-29',
    },
    {
        batch: BATCH_ID,
        part: 9,
        name: 'week_2_part_1',
        route: '/admin/checkout.html',
        deadline: '2022-05-02',
    },
    {
        batch: BATCH_ID,
        part: 10,
        name: 'week_2_part_2',
        route: '/admin/checkout.html',
        deadline: '2022-05-03',
    },
    {
        batch: BATCH_ID,
        part: 11,
        name: 'week_2_part_3',
        route: '/index.html',
        deadline: '2022-05-04',
    },
    {
        batch: BATCH_ID,
        part: 12,
        name: 'week_2_part_4',
        route: '/product.html?id=1',
        deadline: '2022-05-05',
    },
    {
        batch: BATCH_ID,
        part: 13,
        name: 'week_2_part_5',
        route: '/profile.html',
        deadline: '2022-05-06',
    },
    {
        batch: BATCH_ID,
        part: 14,
        name: 'week_3_part_1',
        deadline: '2022-05-09',
    },
    {
        batch: BATCH_ID,
        part: 15,
        name: 'week_3_part_2',
        deadline: '2022-05-10',
    },
    {
        batch: BATCH_ID,
        part: 16,
        name: 'week_3_part_3',
        deadline: '2022-05-11',
    },
    {
        batch: BATCH_ID,
        part: 17,
        name: 'week_3_part_4',
        deadline: '2022-05-12',
    },
    {
        batch: BATCH_ID,
        part: 18,
        name: 'week_3_part_5',
        deadline: '2022-05-13',
    },
    {
        batch: BATCH_ID,
        part: 19,
        name: 'midterm',
        route: '/admin/dashboard.html',
        deadline: '2022-06-11',
    },
]

module.exports = {
    students,
    assignments
}
