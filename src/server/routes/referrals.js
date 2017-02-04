'use strict';

const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', (req, res, next) => {
  queries.getAllReferrals()
  .then((referrals) => {
    res.status(200).json(referrals);
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
