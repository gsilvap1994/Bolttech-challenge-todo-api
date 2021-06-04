exports.up = function (knex) {
  return knex.schema.createTable('tasks', function (table) {
    table.increments('id').unsigned().primary();
    table.string('name').notNullable().unique();
    table.string('description').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('finish_date').nullable();
    table.integer('project_id').unsigned().references('projects.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tasks');
};
