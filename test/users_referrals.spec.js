'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const knex = require('../src/server/db/knex');

const should = chai.should();

chai.use(chaiHttp);

describe('Users Referrals API routes', () => {

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

  describe('GET /users_referrals ', () => {
    it('should return all users referrals', (done) => {
      chai.request(server)
      .get('/users_referrals')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.eql(5);
        res.body[0].should.have.property('user_id');
        res.body[0].user_id.should.eql(1);
        res.body[0].should.have.property('referral_id');
        res.body[0].referral_id.should.eql(5);
        done();
      })
    });
  });

  describe('GET /users_referrals/:id ', () => {
    it('should return single users referral by id', (done) => {
      chai.request(server)
      .get('/users_referrals/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('user_id');
        res.body.user_id.should.eql(1);
        res.body.should.have.property('referral_id');
        res.body.referral_id.should.eql(4);
        done();
      });
    });
  });

  describe('POST /users_referrals ', () => {
    it('should create a new user referral', (done) => {
      chai.request(server)
      .post('/users_referrals')
      .send({
        user_id: 20,
        referral_id: 37,
      })
      .end((err, res) => {
        console.log(err);
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        done();
      });
    });
  });


  describe('PUT /users_referrals/:id ', () => {
    it('should update a users referral by id', (done) => {
      chai.request(server)
      .put('/users_referrals/2')
      .send({
        user_id: 2,
        referral_id: 3
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        res.body.should.have.property('user_id');
        res.body.user_id.should.eql(2);
        res.body.should.have.property('referral_id');
        res.body.referral_id.should.eql(3);
        done();
      });
    });
    it('should NOT update a users referral if the id field is part of the request', (done) => {
      chai.request(server)
      .put('/users_referrals/2')
      .send({
        id: 20
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.should.be.json;  // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('You cannot update the id field');
        done();
      });
    });
  });

  describe('DELETE /users_referrals/:id ', () => {
    it('should delete a users referral by id', (done) => {
      chai.request(server)
      .delete('/users_referrals/2')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        chai.request(server)
        .get('/users_referrals')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.eql(4);
          done();
        });
      });
    });
  });

});
