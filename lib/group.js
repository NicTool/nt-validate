const Joi = require('joi')

const permission = require('./permission')

exports.group = Joi.object({
  nt_group_id: Joi.number().integer().positive(),
  parent_group_id: Joi.number().integer().positive(),
  name: Joi.string().required(),
  deleted: Joi.boolean(),
  has_children: Joi.boolean(),
  permission: permission.permission,
})
