const router = require('express').Router();

const {
    getProgresses
} = require('../controllers/monitor_controller');


router.route('/monitor/progresses/:batch')
    .get(getProgresses);


module.exports = router;