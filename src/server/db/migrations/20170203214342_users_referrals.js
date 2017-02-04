'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_referrals', (table) => {
    table.increments();
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE');
    table.integer('referral_id').notNullable().references('referrals.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_referrals');
};
