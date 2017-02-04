'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const knex = require('../src/server/db/knex');

const should = chai.should();

chai.use(chaiHttp);

describe('Referrals API routes', () => {

  // beforeEach((done) => {
  //   knex.migrate.rollback()
  //   .then(() => {
  //     knex.migrate.latest()
  //     .then(() => {
  //       // return knex.seed.run()
  //       .then(() => {
  //         done();
  //       });
  //     });
  //   });
  // });
  //
  // afterEach((done) => {
  //   knex.migrate.rollback()
  //   .then(() => {
  //     done();
  //   });
  // });

  describe('GET /referrals ', () => {
    xit('should return all referrals', (done) => {
      done();
    });
  });

  describe('GET /referrals/:id ', () => {
    xit('should return single referral by id', (done) => {
      done();
    });
  });
  describe('POST /referrals ', () => {
    xit('should create a new referral', (done) => {
      done();
    });
  });

  describe('PUT /referrals/:id ', () => {
    xit('should update a referral by id', (done) => {
      done();
    });
  });

  describe('DELETE /referrals/:id ', () => {
    xit('should delete a referral by id', (done) => {
      done();
    });
  });

});
