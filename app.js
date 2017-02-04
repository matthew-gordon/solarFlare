'use stirct';

const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res, next) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
