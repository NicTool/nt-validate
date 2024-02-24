const Joi = require('joi')
const { joiPasswordExtendCore } = require('joi-password')
const JoiPassword = Joi.extend(joiPasswordExtendCore)

const shared = require('./shared')
const group = require('./group')

exports.id = Joi.number().integer().min(1).max(4294967295)

exports.username = Joi.string()
  .min(3)
  .max(50)
  .pattern(new RegExp('^[a-zA-Z0-9 _.@-]+$', ''))

exports.password = JoiPassword.string()
  .min(8)
  .max(30)
  .minOfSpecialCharacters(2)
  .minOfLowercase(2)
  .minOfUppercase(2)
  .minOfNumeric(2)
  .doesNotInclude(['password', 'abc', '123', 'asdf'])

exports.email = Joi.string().lowercase().email({ minDomainSegments: 2 })

// v3 API response
exports.v3 = Joi.object({
  id: exports.id,
  first_name: Joi.string().min(1),
  last_name: Joi.string().min(1),
  username: exports.username,
  email: exports.email,
  password: exports.password,
  is_admin: Joi.boolean(),
  deleted: Joi.boolean(),
})

exports.userGET = Joi.object({
  user: exports.v3,
  meta: shared.meta,
})

exports.userPOST = Joi.object({
  id: exports.id,
  first_name: Joi.string().min(1),
  last_name: Joi.string().min(1),
  username: exports.username,
  email: exports.email,
  password: exports.password,
  is_admin: Joi.boolean(),
})

exports.sessionPOST = Joi.object({
  username: exports.username.required(),
  password: exports.password.required(),
})

exports.sessionOut = Joi.object({
  user: exports.v3,
  group: Joi.object({
    id: group.id,
    name: group.name,
  }),
  session: Joi.object({
    id: Joi.number().integer().min(1).max(4294967295),
    last_access: Joi.number().integer().min(1).max(4294967295),
  }),
  meta: shared.meta,
})

exports.v2 = Joi.object({
  nt_user_id: exports.id,
  nt_group_id: group.id,

  first_name: Joi.string().min(1),
  last_name: Joi.string().min(1),
  email: exports.email.required(),
  username: exports.username.required(),
  password: exports.password,

  is_admin: Joi.boolean(),
  deleted: Joi.boolean(),

  // nt_user_session: Joi.string(),
  // last_access: Joi.string(),

  // permission: shared.permission,
})
