'use strict';

const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

// *** GET all users *** //
router.get('/', (req, res, next) => {
  queries.getAllUsers()
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((error) => {
    next(error);
  });
});

// *** GET single user by id *** //
router.get('/:id', (req, res, next) => {
  queries.getSingleUser(req.params.id)
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((error) => {
    next(error);
  });
});

// *** POST create user *** //
router.post('/', (req, res, next) => {
  queries.addUser(req.body)
  .then((userID) => {
    return queries.getSingleUser(userID);
  })
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((error) => {
    next(error);
  });
});

// *** PUT create user *** //
router.put('/:id', (req, res, next) => {
  if(req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'You cannot update the id field'
    });
  }
  queries.updateUser(req.params.id, req.body)
  .then((userID) => {
    return queries.getSingleUser(req.params.id);
  })
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((error) => {
    next(error);
  });
});

// *** DELETE user by id *** //
router.delete('/:id', (req, res, next) => {
  queries.getSingleUser(req.params.id)
  .then((user) => {
    queries.deleteUser(req.params.id)
    .then(() => {
      res.status(200).json(user);
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
