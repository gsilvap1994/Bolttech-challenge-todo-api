// Middleware that handles the authenticated routes

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/bcrypt.json');
const db = require('../../../database/config/knex');

module.exports = auth;

function auth(req, res, next) {
  // search for Bearer token
  if (!req.headers.authorization) {
    throw 'Unauthorized';
  }

  // extract the token from Bearer
  const token = req.headers.authorization.split(' ')[1];

  // decodes with jwt
  const decoded = jwt.verify(token, secret);

  // attach to req.body the user_id
  req.body.user_id = decoded.sub;
  next();
}
