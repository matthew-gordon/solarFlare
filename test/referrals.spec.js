'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const knex = require('../src/server/db/knex');

const should = chai.should();

chai.use(chaiHttp);

describe('Referrals API routes', () => {

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

  describe('GET /referrals ', () => {
    it('should return all referrals', (done) => {
      chai.request(server)
      .get('/referrals')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.eql(5);
        res.body[0].should.have.property('username');
        res.body[0].username.should.eql('chris');
        done();
      })
    });
  });

  xdescribe('GET /referrals/:id ', () => {
    it('should return single referral by id', (done) => {

    });
  });
  xdescribe('POST /referrals ', () => {
    it('should create a new referral', (done) => {

    });
  });

  xdescribe('PUT /referrals/:id ', () => {
    it('should update a referral by id', (done) => {

    });
  });

  xdescribe('DELETE /referrals/:id ', () => {
    it('should delete a referral by id', (done) => {

    });
  });

});
