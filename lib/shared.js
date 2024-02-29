const Joi = require('joi')

exports.meta = Joi.object({
  msg: Joi.string(),
  err: Joi.string(),
  api: Joi.object({
    version: Joi.string(),
  }).unknown(),
}).unknown()

exports.int32 = Joi.number().integer().min(0).max(2147483647)

exports.uint32 = Joi.number().integer().min(0).max(4294967295)

// Clarifications to the DNS specification: http://tools.ietf.org/html/rfc2181
// valid TTL is unsigned number from 0 to 2147483647
exports.ttl = exports.int32
