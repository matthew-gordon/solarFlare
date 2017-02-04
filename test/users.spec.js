'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const knex = require('../src/server/db/knex');

const should = chai.should();

chai.use(chaiHttp);

describe('Users API routes', () => {

  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe('GET /users ', () => {
    xit('should return all users', (done) => {
      done();
    });
  });

  describe('GET /users/:id ', () => {
    xit('should return single user by id', (done) => {
      done();
    });
  });
  describe('POST /users ', () => {
    xit('should create a new user', (done) => {
      done();
    });
  });

  describe('PUT /users/:id ', () => {
    xit('should update a user by id', (done) => {
      done();
    });
  });

  describe('DELETE /users/:id ', () => {
    xit('should delete a user by id', (done) => {
      done();
    });
  });

});
