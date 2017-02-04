'use strict';

const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

// *** GET all referrals *** //

router.get('/', (req, res, next) => {
  queries.getAllReferrals()
  .then((referrals) => {
    res.status(200).json(referrals);
  })
  .catch((error) => {
    next(error);
  });
});

router.get('/:id', (req, res, next) => {
  res.send('Hello from the GET single route');
});

module.exports = router;
