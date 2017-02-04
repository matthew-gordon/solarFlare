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

// *** GET single referral by id *** //
router.get('/:id', (req, res, next) => {
  queries.getSingleReferral(req.params.id)
  .then((referral) => {
    res.status(200).json(referral);
  })
  .catch((error) => {
    next(error);
  });
});

// *** POST create referral *** //
router.post('/', (req, res, next) => {
  queries.addReferral(req.body)
  .then((referralID) => {
    return queries.getSingleReferral(referralID);
  })
  .then((referral) => {
    res.status(200).json(referral);
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
