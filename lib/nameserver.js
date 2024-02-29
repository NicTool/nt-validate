const Joi = require('joi')

const shared = require('./shared')

exports.nameserver = Joi.object({
  id: Joi.number().integer().greater(-1),

  gid: Joi.number().integer().greater(0).required(),

  name: Joi.string()
    .min(2)
    .max(127)
    .domain({ allowFullyQualified: true, tlds: false })
    .pattern(/\.$/)
    .required(),

  ttl: shared.ttl.required(),

  description: Joi.string().empty('').max(255),

  address: Joi.string()
    .ip({ version: ['ipv4'], cidr: 'forbidden' })
    .min(7)
    .max(15)
    .required(),

  address6: Joi.string()
    .ip({ version: ['ipv6'], cidr: 'forbidden' })
    .min(2)
    .max(39),

  remote_login: Joi.string().max(127),

  logdir: Joi.string().empty('').max(255),

  datadir: Joi.string().empty('').min(2).max(255),

  export_interval: Joi.number().integer().greater(-1).max(65535),

  export_serials: Joi.boolean(),

  export_status: Joi.string().max(255),

  export_type: Joi.string()
    .valid('bind', 'djbdns', 'knot', 'nsd', 'maradns', 'powerdns', 'dynect')
    .required(),

  deleted: Joi.boolean(),
})
