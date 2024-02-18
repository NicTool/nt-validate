const Joi = require('joi')
const { joiPasswordExtendCore } = require('joi-password')
const JoiPassword = Joi.extend(joiPasswordExtendCore)

const shared = require('./shared')

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

exports.login = Joi.object({
  username: exports.username.required(),
  password: exports.password.required(),
})

exports.user = Joi.object({
  nt_user_id: Joi.number().integer().min(1).max(4294967295),
  nt_group_id: Joi.number().integer().min(1).max(4294967295),

  first_name: Joi.string().min(1).required(),
  last_name: Joi.string().min(1).required(),

  username: exports.username.required(),
  password: exports.password,

  email: Joi.string().lowercase().email({ minDomainSegments: 2 }).required(),

  is_admin: Joi.boolean(),

  deleted: Joi.boolean(),

  // nt_user_session: Joi.string(),
  // last_access: Joi.string(),

  // permission: shared.permission,
})
