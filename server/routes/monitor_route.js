const router = require('express').Router();

const {
    getProgresses,
    addProgresses,
    updateCurrentAssignment
} = require('../controllers/monitor_controller');


router.route('/monitor/progresses/:batch')
    .get(getProgresses);

router.route('/monitor/progresses')
    .post(addProgresses);

router.route('/monitor/current_assignment')
    .put(updateCurrentAssignment)

module.exports = router;