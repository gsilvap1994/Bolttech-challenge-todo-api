const db = require('../../../database/config/knex');

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteTask,
  deleteAllTasks
};

async function create(params) {
  const task = await db('tasks')
    .where({ name: params.name })
    .andWhere({ project_id: params.project_id });
  console.log(task);
  if (!task) {
    throw 'Something went wrong';
  }

  if (task.length) {
    throw 'Task name already exists.';
  }

  const projects = await db('projects').where({ id: params.project_id });

  if (!projects || !projects.length) {
    throw 'Parent project does not exist.';
  }

  await db('tasks').insert(params);

  return db('tasks').select('id').where('name', params.name);
}

async function getAll({ project_id }) {
  return db('tasks')
    .select(['id', 'name', 'description', 'created_at', 'finish_date'])
    .where('project_id', project_id);
}

async function getById({ user_id, task_id }) {
  const tasks = await db('tasks').select().where('id', task_id);
  if (!tasks) {
    throw 'Something went wrong';
  }

  if (!tasks.length) {
    throw `Task doesn't exist`;
  }

  const task = tasks[0];

  const projects = await db('projects').select().where('id', task.project_id);

  if (projects.length && projects[0].user_id !== user_id) {
    throw 'Unauthorized';
  }

  return {
    id: task.id,
    name: task.name,
    description: task.description,
    created_at: task.created_at,
    finish_date: task.finish_date
  };
}

async function update(params) {
  const tasks = await db('tasks').select().where('id', params.id);

  if (!task) {
    throw 'Something went wrong.';
  }

  if (!tasks[0]) {
    throw `Task doesn't exist`;
  }

  const task = tasks[0];

  return db('tasks').where('id', params.id).update(params);
}

async function deleteTask(params) {
  const tasks = await db('tasks').select().where('id', params.id);
  if (!task) {
    throw 'Something went wrong.';
  }

  if (!tasks[0]) {
    throw `Task doesn't exist`;
  }

  return db('tasks').where('id', params.id).del();
}

async function deleteAllTasks(project_id) {
  const tasks = await db('tasks').select().where('project_id', project_id);
  if (!tasks) {
    throw 'Something went wrong.';
  }

  if (!tasks[0]) {
    return [];
  }

  return db('tasks').where('project_id', project_id).del();
}
