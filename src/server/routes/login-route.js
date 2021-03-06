'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = process.env.TOKEN_SECRET;

//////////////////
////// GET
//////////////////
// used for checking for an existing signed token
router.get('/', function(req, res, next) {
    jwt.verify(req.cookies.token, privateKey, function(err, decoded) {
        if (err) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
});


//////////////////
////// POST
//////////////////
// used for signing in
router.post('/', function(req, res, next) {
    const bodyObj = {
        email: req.body.email,
        password: req.body.password,
    };

    var errObj = {
        email: boom.create(400, 'Email must not be blank'),
        password: boom.create(400, 'Password must not be blank')
    };
    for (var key in bodyObj) {
        if (!(bodyObj[key])) {
            next(errObj[key]);
            return;
        }
    }

    knex('users')
        .where('email', bodyObj.email)
        .first()
        .then((result) => {
            if (result) {
                if (bcrypt.compareSync(bodyObj.password, result.password)) {
                    delete result.password;
                    delete result.created_at;
                    var token = jwt.sign(req.body.email, privateKey);
                    res.cookie('token', token, {
                        httpOnly: true
                    }).send(result);
                } else {
                    next(boom.create(400, 'Bad password'));
                }
            } else {
                next(boom.create(400, 'Bad email or password'));
            }
        })
        .catch((err) => {
            next(err);
        });
});

//////////////////
////// DELETE
//////////////////
// used for signing out
router.delete('/', (req, res, next) => {
  res.clearCookie('token').send(true);
});

module.exports = router;
