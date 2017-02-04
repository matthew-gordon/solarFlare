'use strict';

exports.seed = function(knex, Promise) {
  return knex('users').del() // Deletes ALL existing entries
    .then(function() { // Inserts seed entries one by one in series
      return knex('users').insert({
        name: 'chris',
        email: 'email@email.com'
      });
    }).then(function () {
      return knex('users').insert({
        name: 'ari',
        email: 'email@email.com'
      });
    }).then(function () {
      return knex('users').insert({
        name: 'matt',
        email: 'email@email.com'
      });
    }).then(function () {
      return knex('users').insert({
        name: 'liz',
        email: 'email@email.com'
      });
    }).then(function () {
      return knex('users').insert({
        name: 'laura',
        email: 'email@email.com'
      });
    }).then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
