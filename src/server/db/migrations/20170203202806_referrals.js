'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('referrals', (table) => {
    table.increments();
    table.text('name').unique().notNullable();
    table.text('email').unique().notNullable();
    table.text('phone').defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('referrals');
};
