'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hello from the GET all referrals route');
});

module.exports = router;
