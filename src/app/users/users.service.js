const config = require('../../config/bcrypt.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../../database/config/knex');

module.exports = {
  getAll,
  create,
  auth
};

async function getAll() {
  return db('users').select();
}

async function create(params) {
  const { name, email, password } = params;
  let hash;

  const user = await db('users').where({ email: email });

  if (!user) {
    throw 'Something went wrong';
  }
  if (user.length) {
    throw 'Email already taken';
  }

  if (password) {
    hash = await bcrypt.hash(password, 12);
  }

  await db('users').insert({ name, email, password_hash: hash });

  return db('users').select('id').where('email', email);
}

async function auth({ email, password }) {
  let user = await db('users').select().where('email', email);

  if (!user) {
    throw 'Something went wrong';
  }

  user = user[0];

  if (!user) {
    throw 'User does not exist';
  }

  if (!(await bcrypt.compare(password, user.password_hash))) {
    throw 'Wrong credentials';
  }

  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '20d' });
  const { password_hash, ...userWithoutHash } = user;
  return { user: userWithoutHash, token };
}
