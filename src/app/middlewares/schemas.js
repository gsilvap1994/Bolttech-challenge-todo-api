const Joi = require('joi');

const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
});

const ProjectSchema = Joi.object({
  name: Joi.string().required(),
  user_id: Joi.number().required()
});

const TaskCreateSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  finish_date: Joi.date().optional(),
  project_id: Joi.number().required()
});

const TaskUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  finish_date: Joi.date().optional()
});

module.exports = {
  UserSchema,
  ProjectSchema,
  TaskCreateSchema,
  TaskUpdateSchema
};
