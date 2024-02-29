const Joi = require('joi')

const shared = require('./shared')
const permission = require('./permission')

exports.id = Joi.number().integer().min(1).max(4294967295)

exports.pid = shared.uint32

exports.name = Joi.string()
  .min(3)
  .max(255)
  .pattern(new RegExp("^[a-zA-Z0-9 _.@'-]+$"))
  .pattern(new RegExp('^[a-zA-Z0-9]'))

exports.v3 = Joi.object({
  id: exports.id,
  parent_gid: exports.pid,
  name: exports.name.required(),
  deleted: Joi.boolean(),
  has_children: Joi.boolean(),
  permission: permission.v3,
})

// legacy group format
exports.v2 = Joi.object({
  nt_group_id: exports.id,
  parent_group_id: exports.pid,
  name: exports.name.required(),
  deleted: Joi.boolean(),
  has_children: Joi.boolean(),
  permission: permission.v3,
})

exports.GET = Joi.object({
  group: Joi.object({
    id: exports.pid,
    parent_gid: exports.pid,
    name: exports.name,
    permission: permission.v3,
  }),
  meta: shared.meta,
})

exports.POST = Joi.object({
  id: exports.id,
  name: exports.name,
  parent_gid: exports.pid,
  permission: permission.v3,
})
