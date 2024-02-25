const assert = require('node:assert/strict')
const { describe, it } = require('node:test')

const schema = require('./session')

describe('session', () => {
  describe('POST', function () {
    it('accepts valid', () => {
      const { error } = schema.POST.validate({
        username: 'valid',
        password: 'ab12CD#%alph',
      })
      assert.ifError(error)
    })

    it('rejects missing username', () => {
      const { error } = schema.POST.validate({
        password: 'ab12CD#%alph',
      })
      assert.strictEqual(error.message, '"username" is required')
    })

    it('rejects missing password', () => {
      const { error } = schema.POST.validate({
        username: 'valid',
      })
      assert.strictEqual(error.message, '"password" is required')
    })
  })
})
