'use strict';

exports.seed = function(knex, Promise) {
  return knex('users').del() // Deletes ALL existing entries
    .then(function() { // Inserts seed entries one by one in series
      return knex('users').insert({
        id: 1,
        name: 'chris',
        email: 'chris@email.com'
      });
    }).then(function () {
      return knex('users').insert({
        id: 2,
        name: 'ari',
        email: 'ari@email.com'
      });
    }).then(function () {
      return knex('users').insert({
        id: 3,
        name: 'matt',
        email: 'matt@email.com'
      });
    }).then(function () {
      return knex('users').insert({
        id: 4,
        name: 'liz',
        email: 'liz@email.com'
      });
    }).then(function () {
      return knex('users').insert({
        id: 5,
        name: 'laura',
        email: 'laura@email.com'
      });
    }).then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
