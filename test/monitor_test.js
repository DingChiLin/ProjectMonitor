require('dotenv');
const {assert, requester} = require('./set_up');
const Monitor = require('../server/models/monitor_model');
const {pullRequestPayload, commentPayload, mergePayload, closePayload} = require('./payload');

describe('monitor', async () => {
    it('get pull request and pass the validation', async () => {
        const data = pullRequestPayload;

        const res = await requester
            .post('/api/1.0/monitor/progresses')
            .send(data);

        assert.equal(res.body.data, "OK");

        const progress = await Monitor.getProgressByPRLink(pullRequestPayload.pull_request.html_url);
        assert.equal(progress.student_id, 2);
        assert.equal(progress.status_id, 1);
    }).timeout(5000);

    it('get comment with body "fixed" and pass the validation', async () => {
        // change status to 2
        await Monitor.updateProgress(1, {status_id: 2});
        const errorProgress = await Monitor.getProgressByPRLink(commentPayload.issue.html_url);
        
        assert.equal(errorProgress.status_id, 2);

        const data = commentPayload;

        const res = await requester
            .post('/api/1.0/monitor/progresses')
            .send(data);

        assert.equal(res.body.data, "OK");

        // status should be changed back to 1
        const progress = await Monitor.getProgressByPRLink(commentPayload.issue.html_url);
        assert.equal(progress.status_id, 1);
    }).timeout(5000);

    it('get merge', async () => {
        const data = mergePayload;

        const res = await requester
            .post('/api/1.0/monitor/progresses')
            .send(data);

        console.log(res.body.data);
        assert.equal(res.body.data, "OK");

        const progress = await Monitor.getProgressByPRLink(mergePayload.pull_request.html_url);
        assert.equal(progress.status_id, 3);
    }).timeout(5000);

    it('get close', async () => {
        const data = closePayload;

        const res = await requester
            .post('/api/1.0/monitor/progresses')
            .send(data);

        console.log(res.body.data);
        assert.equal(res.body.data, "OK");

        const progress = await Monitor.getProgressByPRLink(closePayload.pull_request.html_url);
        assert.equal(progress.status_id, 4);
    }).timeout(5000);
})
