const Joi = require('joi')

const shared = require('./shared')

exports.zone_record = Joi.object({
  id: shared.uint32.min(1).required(),

  zid: shared.uint32.min(1).required(),

  name: Joi.string()
    .min(1)
    .max(255)
    .domain({ minDomainSegments: 1, allowFullyQualified: false, tlds: false })
    .required(),

  ttl: shared.ttl.required(),

  type: Joi.string()
    .valid('A', 'AAAA', 'PTR', 'MX', 'NS', 'CNAME', 'SRV')
    .required(),

  address: Joi.string()
    .ip({ version: ['ipv4'], cidr: 'forbidden' })
    .min(7)
    .max(15)
    .required(),

  deleted: Joi.boolean(),
})
