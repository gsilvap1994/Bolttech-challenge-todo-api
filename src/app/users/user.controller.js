const express = require('express');
const router = express.Router();
const userService = require('./users.service');
const { UserSchema } = require('../middlewares/schemas');
const validateRequest = require('../middlewares/validate_request');

router.get('/', getAll);
router.post('/create', registerSchema, register);
router.post('/login', login);

module.exports = router;

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then((user) => res.json(user[0]))
    .catch(next);
}

function registerSchema(req, res, next) {
  validateRequest(req, next, UserSchema);
}

function login(req, res, next) {
  userService
    .auth(req.body)
    .then((response) => res.json(response))
    .catch(next);
}
