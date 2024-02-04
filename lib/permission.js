const Joi = require('joi')

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
