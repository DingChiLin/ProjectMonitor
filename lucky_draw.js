require('dotenv').config()
const knex = require('./server/models/database')
const Monitor = require('./server/models/monitor_model'); 
const batchId = process.env.BATCH;

const projectOneReviewGroup = [
    [6, 8, 14],
    [3, 7, 9, 12],
    [15, 5, 10],
    [11, 13, 4]
]

const topicDiscussionGroup = [
    [4, 15, 9],
    [11, 10, 12],
    [7, 14, 13],
    [8, 5, 3, 6]
]

const topics = [projectOneReviewGroup, topicDiscussionGroup]

function draw(studentMap, topicId, groupId) {
    const studentsGroups = topics[topicId];
    const studentIds = studentsGroups[groupId];
    const drawId = Math.floor(Math.random() * studentIds.length)
    const studentId = studentIds[drawId];
    return studentMap[studentId];
}

async function main() {
    const studentList = await Monitor.getStudents(batchId);
    const studentMap = studentList.reduce((obj, student) => {
        obj[student.id] = student.name
        return obj;
    }, {})
    await knex.destroy();

    /**
     * 0: projdct 1 review
     * 1: topic discussion
     */    
    const topicId = process.argv[2] - 1;

    /**
     * group_number
     */
    const groupId = process.argv[3] - 1;
    const studentName = draw(studentMap, topicId, groupId);
    console.log(studentName);
}

main();