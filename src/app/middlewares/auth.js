const jwt = require('jsonwebtoken');
const { secret } = require('../../config/bcrypt.json');
const db = require('../../../database/config/knex');

module.exports = auth;

function auth(req, res, next) {
  if (!req.headers.authorization) {
    throw 'Unauthorized';
  }

  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, secret);
  req.body.user_id = decoded.sub;
  next();
}
