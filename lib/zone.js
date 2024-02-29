const Joi = require('joi')

const shared = require('./shared')

exports.v3 = Joi.object({
  id: shared.uint32,

  gid: shared.uint32.required(),

  zone: Joi.string()
    .min(3)
    .max(255)
    .domain({ allowFullyQualified: true, tlds: false })
    .required(),

  description: Joi.string().empty(''),

  mailaddr: Joi.string().empty(''),

  minimum: shared.int32.required(),

  nameservers: Joi.array().items(Joi.string()),

  refresh: shared.int32.required(),

  retry: shared.int32.required(),

  expire: shared.int32.required(),

  serial: shared.int32.required(),

  ttl: shared.ttl.required(),

  deleted: Joi.boolean(),
})
