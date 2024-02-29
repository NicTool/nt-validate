const Joi = require('joi')

const shared = require('./shared')
const group = require('./group')
const user = require('./user')

exports.POST = Joi.object({
  username: user.username.required(),
  password: user.password.required(),
})

exports.GET = Joi.object({
  user: user.v3,
  group: Joi.object({
    id: group.id,
    name: group.name,
    parent_gid: group.pid,
  }),
  session: Joi.object({
    id: Joi.number().integer().min(1).max(4294967295),
    last_access: Joi.number().integer().min(1).max(4294967295),
  }),
  meta: shared.meta,
})
