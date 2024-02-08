const Joi = require('joi')

const shared = require('./shared')

exports.zone_record = Joi.object({
  nt_zone_id: Joi.number().integer().positive().required(),

  name: Joi.string()
    .min(1)
    .max(255)
    .domain({ minDomainSegments: 1, allowFullyQualified: false, tlds: false })
    //   // .pattern(new RegExp("^[a-zA-Z0-9 _.@'-]+$"))
    //   // .pattern(new RegExp('^[a-zA-Z0-9]'))
    .required(),

  // description: Joi.string().empty(''),

  // mailaddr: Joi.string().empty(''),

  // minimum: Joi.number().integer().greater(-1).max(2147483647).required(),

  // nameservers: Joi.array().items(Joi.string()),

  // refresh: Joi.number().integer().greater(-1).max(2147483647).required(),

  // retry: Joi.number().integer().greater(-1).max(2147483647).required(),

  // expire: Joi.number().integer().greater(-1).max(2147483647).required(),

  ttl: shared.ttl.required(),

  type: Joi.string()
    .valid('A', 'AAAA', 'PTR', 'MX', 'NS', 'CNAME', 'SRV')
    .required(),

  address: Joi.string()
    .ip({ version: ['ipv4'], cidr: 'forbidden' })
    .min(7)
    .max(15)
    .required(),

  // deleted: Joi.boolean(),

  // has_children: Joi.boolean(),
  // permission: permission.permission,
})
