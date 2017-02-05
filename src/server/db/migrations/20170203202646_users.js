'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.text('name').unique().notNullable();
    table.text('email').unique().notNullable();
    table.boolean('is_admin').defaultTo(false);
    table.boolean('is_partner').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
