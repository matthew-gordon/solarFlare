'use strict';

exports.seed = function(knex, Promise) {
  return knex('referrals').del() // Deletes ALL existing entries
    .then(function() { // Inserts seed entries one by one in series
      return knex('referrals').insert({
        id: 1,
        name: 'Bill Smith',
        email: 'email@email.com',
        phone: '720-555-1234'
      });
    }).then(function () {
      return knex('referrals').insert({
        id: 2,
        name: 'Artisan Water',
        email: 'email@email.com',
        phone: '720-555-1234'
      });
    }).then(function () {
      return knex('referrals').insert({
        id: 3,
        name: 'Makeit Happen',
        email: 'email@email.com',
        phone: '720-555-1234'
      });
    }).then(function () {
      return knex('referrals').insert({
        id: 4,
        name: 'like Me',
        email: 'email@email.com',
        phone: '720-555-1234'
      });
    }).then(function () {
      return knex('referrals').insert({
        id: 5,
        name: 'Laura Bakol',
        email: 'email@email.com',
        phone: '720-555-1234'
      });
    }).then(() => {
      return knex.raw("SELECT setval('referrals_id_seq', (SELECT MAX(id) FROM referrals))");
    });
};
