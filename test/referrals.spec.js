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
        res.body[0].should.have.property('name');
        res.body[0].name.should.eql('Bill Smith');
        done();
      })
    });
  });

  describe('GET /referrals/:id ', () => {
    it('should return single referral by id', (done) => {
      chai.request(server)
      .get('/referrals/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.eql('Artisan Water');
        done();
      });
    });
  });

  describe('POST /referrals ', () => {
    it('should create a new referral', (done) => {
      chai.request(server)
      .post('/referrals')
      .send({
        name: 'Mateo Gordo',
        email: 'test@solarflare.com',
        phone: '720-720-0072'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.eql('Mateo Gordo')
        res.body.should.have.property('email');
        res.body.email.should.eql('test@solarflare.com')
        res.body.should.have.property('phone');
        res.body.phone.should.eql('720-720-0072');
        done();
      });
    });
  });

  describe('PUT /referrals/:id ', () => {
    it('should update a referral by id', (done) => {
      chai.request(server)
      .put('/referrals/2')
      .send({
        name: 'Updated Name',
        email: 'Updated email',
        phone: 'uuu-ppp-date'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.eql('Updated Name');
        res.body.should.have.property('email');
        res.body.email.should.eql('Updated email');
        res.body.should.have.property('phone');
        res.body.phone.should.eql('uuu-ppp-date');
        done();
      });
    });
    it('should NOT update a message if the id field is part of the request', (done) => {
      chai.request(server)
      .put('/referrals/2')
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

  describe('DELETE /referrals/:id ', () => {
    it('should delete a referral by id', (done) => {
      chai.request(server)
      .delete('/referrals/2')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        chai.request(server)
        .get('/referrals')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.eql(4);
        });
      });
    });
  });

});
