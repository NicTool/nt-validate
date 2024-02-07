const Joi = require('joi')

exports.nt_group_id = Joi.number().integer().positive()

exports.permission = Joi.object({
  group: Joi.object({
    write: Joi.boolean(),
    create: Joi.boolean(),
    delete: Joi.boolean(),
  }),
  user: Joi.object({
    self_write: Joi.boolean(),
    write: Joi.boolean(),
    create: Joi.boolean(),
    delete: Joi.boolean(),
  }),
  nameserver: Joi.object({
    write: Joi.boolean(),
    create: Joi.boolean(),
    delete: Joi.boolean(),
  }),
  usable_ns: Joi.array().items(Joi.number().integer().positive()),
  zone: Joi.object({
    write: Joi.boolean(),
    create: Joi.boolean(),
    delete: Joi.boolean(),
    delegate: Joi.boolean(),
  }),
  zone_record: Joi.object({
    write: Joi.boolean(),
    create: Joi.boolean(),
    delete: Joi.boolean(),
    delegate: Joi.boolean(),
  }),
})

// Clarifications to the DNS specification: http://tools.ietf.org/html/rfc2181
// valid TTL is unsigned number from 0 to 2147483647
exports.ttl = Joi.number().integer().greater(-1).max(2147483647)
