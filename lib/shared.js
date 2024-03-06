const Joi = require('joi')

exports.meta = Joi.object({
  msg: Joi.string(),
  err: Joi.string(),
  api: Joi.object({
    version: Joi.string(),
  }).unknown(),
}).unknown()

exports.int8 = Joi.number().integer().min(-128).max(127)

exports.uint8 = Joi.number().integer().min(0).max(255)

exports.int16 = Joi.number().integer().min(-32768).max(32767)

exports.uint16 = Joi.number().integer().min(0).max(65535)

exports.int32 = Joi.number().integer().min(-2147483648).max(2147483647)

exports.uint32 = Joi.number().integer().min(0).max(4294967295)

exports.ipv4 = Joi.string()
  .ip({ version: ['ipv4'], cidr: 'forbidden' })
  .min(7)
  .max(15)

exports.ipv6 = Joi.string()
  .ip({ version: ['ipv6'], cidr: 'forbidden' })
  .min(2)
  .max(39)

// Clarifications to the DNS specification: http://tools.ietf.org/html/rfc2181
// valid TTL is unsigned number from 0 to 2147483647
exports.ttl = exports.int32.min(0)
