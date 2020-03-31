require('dotenv');
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert
const {pullRequestPayload} = require('./payload');

chai.use(chaiHttp);

describe('monitor', async () => {
    it('get pull request', async () => {
        const data = {payload: JSON.stringify(pullRequestPayload)};

        const res = await chai.request(app)
            .post('/api/1.0/monitor/progresses')
            .send(data);

        console.log(res.body.data);

        assert.equal(res.body.data, "OK add progress");
    })
})