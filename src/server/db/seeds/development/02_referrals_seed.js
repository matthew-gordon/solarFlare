'use strict';

exports.seed = function(knex, Promise) {
  return knex('referrals').del() // Deletes ALL existing entries
    .then(function() { // Inserts seed entries one by one in series
      return knex('referrals').insert({
        name: 'chris',
        email: 'email@email.com'
      });
    }).then(function () {
      return knex('referrals').insert({
        name: 'ari',
        email: 'email@email.com'
      });
    }).then(function () {
      return knex('referrals').insert({
        name: 'matt',
        email: 'email@email.com'
      });
    }).then(function () {
      return knex('referrals').insert({
        name: 'liz',
        email: 'email@email.com'
      });
    }).then(function () {
      return knex('referrals').insert({
        name: 'laura',
        email: 'email@email.com'
      });
    }).then(() => {
      return knex.raw("SELECT setval('referrals_id_seq', (SELECT MAX(id) FROM referrals))");
    });
};
