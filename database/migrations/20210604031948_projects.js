exports.up = function (knex) {
  return knex.schema.createTable('projects', function (table) {
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.foreign('user_id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('projects');
};
