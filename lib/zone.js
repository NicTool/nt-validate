const Joi = require('joi')

const shared = require('./shared')

exports.zone = Joi.object({
  nt_group_id: Joi.number().integer().positive().required(),

  zone: Joi.string()
    .min(3)
    .max(255)
    .domain({ allowFullyQualified: true, tlds: false })
    .required(),

  description: Joi.string().empty(''),

  mailaddr: Joi.string().empty(''),

  minimum: Joi.number().integer().greater(-1).max(2147483647).required(),

  nameservers: Joi.array().items(Joi.string()),

  refresh: Joi.number().integer().greater(-1).max(2147483647).required(),

  retry: Joi.number().integer().greater(-1).max(2147483647).required(),

  expire: Joi.number().integer().greater(-1).max(2147483647).required(),

  serial: Joi.number().integer().greater(-1).max(2147483647).required(),

  ttl: shared.ttl.required(),

  deleted: Joi.boolean(),
})
