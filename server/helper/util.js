require('dotenv').config();
const moment = require('moment-timezone');

const getCurrentAssignmentId = (assignments) => {
    const current_date = moment().tz("Asia/Taipei").format('YYYY-MM-DD');
    const assignment = assignments.filter(a => moment(a.deadline) <= moment(current_date)).pop();
    if (assignment) {
        return assignment.id;
    } else {
        return 1
    };
}

module.exports = {
    getCurrentAssignmentId
}