const Joi = require('joi')

const shared = require('./shared')

exports.group = Joi.object({
  nt_group_id: Joi.number().integer().positive(),

  parent_group_id: Joi.number().integer().greater(-1),

  name: Joi.string()
    .min(3)
    .max(255)
    .pattern(new RegExp("^[a-zA-Z0-9 _.@'-]+$"))
    .pattern(new RegExp('^[a-zA-Z0-9]'))
    .required(),

  deleted: Joi.boolean(),

  has_children: Joi.boolean(),

  permission: shared.permission,
})
