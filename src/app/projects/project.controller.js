const express = require('express');
const auth = require('../middlewares/auth');
const { ProjectSchema } = require('../middlewares/schemas');
const validateRequest = require('../middlewares/validate_request');
const router = express.Router();
const projectService = require('./project.service');

router.use(auth);

router.post('/create', createSchema, createProject);
router.get('/', getProjects);
router.get('/:id', getProject);
router.put('/:id', createSchema, updateProject);
router.delete('/:id', deleteProject);

module.exports = router;

function createSchema(req, res, next) {
  validateRequest(req, next, ProjectSchema);
}

function createProject(req, res, next) {
  projectService
    .create(req.body)
    .then((project) => res.json(project[0]))
    .catch(next);
}

function getProjects(req, res, next) {
  projectService
    .getAll(req.body)
    .then((projects) => res.json(projects))
    .catch(next);
}

function getProject(req, res, next) {
  projectService
    .getById({ user_id: req.body.user_id, project_id: req.params.id })
    .then((project) => res.json(project))
    .catch(next);
}

function updateProject(req, res, next) {
  projectService
    .update({ ...req.body, id: req.params.id })
    .then((project) => res.json(project))
    .catch(next);
}

function deleteProject(req, res, next) {
  projectService
    .deleteProject({ ...req.body, id: req.params.id })
    .then((response) => res.json(response))
    .catch(next);
}
