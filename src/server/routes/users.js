'use strict';

const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', (req, res, next) => {
  res.send('Hello from the GET all users route');
});

module.exports = router;
