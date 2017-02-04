'use strict';

const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

// *** GET all users referrals *** //
router.get('/', (req, res, next) => {
  queries.getAllUsersReferrals()
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((error) => {
    next(error);
  });
});

// *** GET single user referral by id *** //
router.get('/:id', (req, res, next) => {
  queries.getSingleUsersReferrals(req.params.id)
  .then((userReferral) => {
    res.status(200).json(userReferral);
  })
  .catch((error) => {
    next(error);
  });
});

// *** POST create user referral *** //
router.post('/', (req, res, next) => {
  queries.addUsersReferral(req.body)
  .then((userReferralID) => {
    return queries.getSingleUsersReferrals(userReferralID);
  })
  .then((userReferral) => {
    res.status(200).json(userReferral);
  })
  .catch((error) => {
    next(error);
  });
});

// *** PUT create user referral *** //
router.put('/:id', (req, res, next) => {
  if(req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'You cannot update the id field'
    });
  }
  queries.updateUsersReferral(req.params.id, req.body)
  .then((userReferralID) => {
    return queries.getSingleUsersReferrals(req.params.id);
  })
  .then((userReferral) => {
    res.status(200).json(userReferral);
  })
  .catch((error) => {
    next(error);
  });
});

// *** DELETE user referral by id *** //
router.delete('/:id', (req, res, next) => {
  queries.getSingleUsersReferrals(req.params.id)
  .then((userReferrals) => {
    queries.deleteUsersReferral(req.params.id)
    .then(() => {
      res.status(200).json(userReferrals);
    })
    .catch((error) => {
      next(error);
    });
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
