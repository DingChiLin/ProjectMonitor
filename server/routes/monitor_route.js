const router = require('express').Router();

const {
    getProgresses,
    addProgresses
} = require('../controllers/monitor_controller');


router.route('/monitor/progresses/:batch')
    .get(getProgresses);

router.route('/monitor/progresses')
    .post(addProgresses);

module.exports = router;