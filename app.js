'use strict';

const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const users = require('./src/server/routes/users');
const referrals = require('./src/server/routes/referrals');
const usersReferrals = require('./src/server/routes/users_referrals');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, 'src/client')));

app.use('/users', users);
app.use('/referrals', referrals);
app.use('/tracking', usersReferrals);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handlers
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handlers
// no stacktrace leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(port, () => {
  console.log(`Solar flare is running on port ${port}...`);
});

module.exports = app;
