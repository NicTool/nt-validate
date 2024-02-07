const Joi = require('joi')
const { joiPasswordExtendCore } = require('joi-password')
const JoiPassword = Joi.extend(joiPasswordExtendCore)

const shared = require('./shared')

exports.user = Joi.object({
  username: Joi.string()
    .min(3)
    .max(50)
    .pattern(new RegExp('^[a-zA-Z0-9 _.-]+$', ''))
    .required(),

  first_name: Joi.string().min(1).required(),

  last_name: Joi.string().min(1).required(),

  email: Joi.string().lowercase().email({ minDomainSegments: 2 }).required(),

  password: JoiPassword.string()
    .min(8)
    .max(30)
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .doesNotInclude(['password', 'abc', '123', 'asdf'])
    .required(),

  nt_user_id: Joi.number().integer().positive(),
  nt_group_id: Joi.number().integer().positive(),

  deleted: Joi.boolean(),
  is_admin: Joi.boolean(),

  permission: shared.permission,
})
