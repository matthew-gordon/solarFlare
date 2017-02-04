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
    it('should return all users', (done) => {
      chai.request(server)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.eql(5);
        res.body[0].should.have.property('name');
        res.body[0].name.should.eql('chris');
        res.body[0].should.have.property('email');
        res.body[0].email.should.eql('chris@email.com');
        done();
      })
    });
  });

  describe('GET /users/:id ', () => {
    it('should return single user by id', (done) => {
      chai.request(server)
      .get('/users/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.eql('ari');
        res.body.should.have.property('email');
        res.body.email.should.eql('ari@email.com');
        done();
      });
    });
  });

  describe('POST /users ', () => {
    it('should create a new user', (done) => {
      chai.request(server)
      .post('/users')
      .send({
        name: 'Mateo Gordo',
        email: 'test@solarflare.com',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.eql('Mateo Gordo')
        res.body.should.have.property('email');
        res.body.email.should.eql('test@solarflare.com');
        done();
      });
    });
  });

  describe('PUT /users/:id ', () => {
    it('should update a user by id', (done) => {
      chai.request(server)
      .put('/users/2')
      .send({
        name: 'Updated Name',
        email: 'Updated email'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.eql('Updated Name');
        res.body.should.have.property('email');
        res.body.email.should.eql('Updated email');
        done();
      });
    });
    it('should NOT update a message if the id field is part of the request', (done) => {
      chai.request(server)
      .put('/users/2')
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

  describe('DELETE /users/:id ', () => {
    it('should delete a user by id', (done) => {
      chai.request(server)
      .delete('/users/2')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        chai.request(server)
        .get('/users')
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
