const db = require('../../../database/config/knex');

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteProject
};

async function create(params) {
  const project = await db('projects').where({ name: params.name });
  if (project.length) {
    throw 'Project name already exists.';
  }

  await db('projects').insert(params);

  return db('projects').select('id').where('name', params.name);
}

async function getAll({ user_id }) {
  return db('projects').select(['id', 'name']).where('user_id', user_id);
}

async function getById({ user_id, project_id }) {
  const projects = await db('projects').select().where('id', project_id);

  if (!projects || !projects.length) {
    throw `Project doesn't exist`;
  }

  const project = projects[0];

  const authorized_project = project.user_id === user_id;

  if (!authorized_project) {
    throw 'Unauthorized';
  }

  return { id: project.id, name: project.name };
}

async function update(params) {
  const projects = await db('projects')
    .select()
    .where('id', params.id)
    .andWhere('user_id', params.user_id);

  if (!projects || !projects[0]) {
    throw `Project doesn't exist`;
  }

  const project = projects[0];

  return db('projects').where('id', params.id).update(params);
}

async function deleteProject(params) {
  const projects = await db('projects')
    .select()
    .where('id', params.id)
    .andWhere('user_id', params.user_id);

  if (!projects || !projects[0]) {
    throw `Project doesn't exist`;
  }

  return db('projects').where('id', params.id).del();
}
