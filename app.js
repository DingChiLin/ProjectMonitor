require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const {PORT_TEST, PORT, NODE_ENV, API_VERSION} = process.env;
const port = NODE_ENV == 'test' ? PORT_TEST : PORT;

app.set('json spaces', 2);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/scripts/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/scripts/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/scripts/lodash', express.static(__dirname + '/node_modules/lodash/'));

app.use(`/api/${API_VERSION}`,
    (req, res, next) => {
        return next();
    },
    [
        require('./server/routes/monitor_route'),
    ]
);

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

app.get('/', (req, res) => {
    console.log(__dirname);
    res.send("Welcome to Project Monitor")
});

app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app