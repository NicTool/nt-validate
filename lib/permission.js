const Joi = require('joi')

exports.id = Joi.number().integer().min(1).max(4294967295)

exports.v3 = Joi.object({
  name: Joi.string(),
  self_write: Joi.boolean(),
  group: Joi.object({
    id: exports.id,
    write: Joi.boolean(),
    create: Joi.boolean(),
    delete: Joi.boolean(),
  }),
  user: Joi.object({
    id: exports.id,
    write: Joi.boolean(),
    create: Joi.boolean(),
    delete: Joi.boolean(),
  }),
  nameserver: Joi.object({
    usable: Joi.array().items(Joi.number().integer().positive()),
    write: Joi.boolean(),
    create: Joi.boolean(),
    delete: Joi.boolean(),
  }),
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
