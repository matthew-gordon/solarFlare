'use strict';

const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const referrals = require('./src/server/routes/referrals');
const users = require('./src/server/routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, 'src/client')));

app.use('/referrals', referrals);
// app.use('/users', users);

app.listen(port, () => {
  console.log(`Solar flare is running on port ${port}...`);
});
