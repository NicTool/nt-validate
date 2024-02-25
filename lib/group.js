const Joi = require('joi')

const shared = require('./shared')

exports.id = Joi.number().integer().min(1).max(4294967295)

exports.name = Joi.string()
  .min(3)
  .max(255)
  .pattern(new RegExp("^[a-zA-Z0-9 _.@'-]+$"))
  .pattern(new RegExp('^[a-zA-Z0-9]'))

exports.v3 = Joi.object({
  id: exports.id,
  parent_gid: Joi.number().integer().greater(-1),
  name: exports.name.required(),
  deleted: Joi.boolean(),
  has_children: Joi.boolean(),
  permission: shared.permission,
})

// legacy group format
exports.v2 = Joi.object({
  nt_group_id: exports.id,
  parent_group_id: Joi.number().integer().greater(-1),
  name: exports.name.required(),
  deleted: Joi.boolean(),
  has_children: Joi.boolean(),
  permission: shared.permission,
})

exports.GET = Joi.object({
  group: Joi.object({
    id: exports.id,
    name: exports.name,
  }),
  meta: shared.meta,
})

exports.POST = Joi.object({
  id: exports.id,
  name: exports.name,
  parent_gid: exports.id,
})
