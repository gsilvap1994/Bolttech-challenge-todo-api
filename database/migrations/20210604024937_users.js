exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password_hash').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
