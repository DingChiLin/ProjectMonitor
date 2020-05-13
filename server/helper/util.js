require('dotenv').config();
const moment = require('moment-timezone');

const getCurrentAssignmentId = (assignments) => {
    const current_date = moment().tz("Asia/Taipei").format('YYYY-MM-DD');
    const assignment = assignments.filter(a => a.deadline == current_date)[0];
    return assignment.id;
}

module.exports = {
    getCurrentAssignmentId
}