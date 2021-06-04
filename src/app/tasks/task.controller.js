const express = require('express');
const auth = require('../middlewares/auth');
const {
  TaskCreateSchema,
  TaskUpdateSchema
} = require('../middlewares/schemas');
const validateRequest = require('../middlewares/validate_request');
const router = express.Router();
const taskService = require('./task.service');

router.use(auth);

router.post('/create', createSchema, createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', updateSchema, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;

function createSchema(req, res, next) {
  validateRequest(req, next, TaskCreateSchema);
}

function updateSchema(req, res, next) {
  validateRequest(req, next, TaskUpdateSchema);
}

function createTask(req, res, next) {
  taskService
    .create(req.body)
    .then((task) => res.json(task[0]))
    .catch(next);
}

function getTasks(req, res, next) {
  taskService
    .getAll(req.query)
    .then((tasks) => res.json(tasks))
    .catch(next);
}

function getTask(req, res, next) {
  taskService
    .getById({ user_id: req.body.user_id, task_id: req.params.id })
    .then((task) => res.json(task))
    .catch(next);
}

function updateTask(req, res, next) {
  taskService
    .update({ ...req.body, id: req.params.id })
    .then((task) => res.json(task))
    .catch(next);
}

function deleteTask(req, res, next) {
  taskService
    .deleteTask({ ...req.body, id: req.params.id })
    .then((response) => res.json(response))
    .catch(next);
}
