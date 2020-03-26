const moment = require('moment');
const Monitor = require('../models/monitor_model');

const getProgresses = async (req, res) => {
    const {batch} = req.params;

    const students = await Monitor.getStudents(batch);
    const assignments = await Monitor.getAssignments(batch);
    const progresses = await Monitor.getProgresses(students.map(s => s.id));
    const status = await Monitor.getStatus();

    res.status(200).json({students, assignments, progresses, status});
}

const addProgresses = async (req, res) => {
    console.log(req.body.payload);
    const payload = JSON.parse(req.body.payload);
    console.log(payload.action);
    console.log(payload.repository);
    console.log(payload.sender);
    res.send("OK add progress")
}

module.exports = {
    getProgresses,
    addProgresses
}