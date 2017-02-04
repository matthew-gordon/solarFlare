'use strict';

exports.seed = function(knex, Promise) {
  return knex('users_referrals').del() // Deletes ALL existing entries
    .then(function() { // Inserts seed entries one by one in series
      return knex('users_referrals').insert({
        id: 1,
        user_id: 1,
        referral_id: 5
      });
    }).then(function () {
      return knex('users_referrals').insert({
        id: 2,
        user_id: 1,
        referral_id: 4
      });
    }).then(function () {
      return knex('users_referrals').insert({
        id: 3,
        user_id: 2,
        referral_id: 3
      });
    }).then(function () {
      return knex('users_referrals').insert({
        id: 4,
        user_id: 2,
        referral_id: 2
      });
    }).then(function () {
      return knex('users_referrals').insert({
        id: 5
        user_id: 2,
        referral_id: 1
      });
    }).then(() => {
      return knex.raw("SELECT setval('users_referrals_id_seq', (SELECT MAX(id) FROM users_referrals))");
    });
};
