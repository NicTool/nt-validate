const assert = require('node:assert/strict')

const schema = require('../lib/user').user
const testUser = require('./fixtures/user.json')

describe('user', function () {
  describe('username', function () {
    it('accepts valid', () => {
      const testCase = JSON.parse(JSON.stringify(testUser))

      const { error, value } = schema.validate(testCase)

      assert.ifError(error)
      assert.deepStrictEqual(testCase, value)
    })

    it('rejects missing', () => {
      const testCase = JSON.parse(JSON.stringify(testUser))
      delete testCase.username

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(error.message, '"username" is required')
      assert.deepStrictEqual(testCase, value)
    })

    it('rejects too short', () => {
      const testCase = JSON.parse(JSON.stringify(testUser))
      testCase.username = 'u'

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(
        error.message,
        '"username" length must be at least 3 characters long',
      )
      assert.deepStrictEqual(testCase, value)
    })

    it('rejects too long', () => {
      const testCase = JSON.parse(JSON.stringify(testUser))
      testCase.username =
        'abcdefghijklmopqrstuvwxyzabcdefghijklmopqrstuvwxyzabcdefghijklmopqrstuvwxyz'

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(
        error.message,
        '"username" length must be less than or equal to 50 characters long',
      )
      assert.deepStrictEqual(testCase, value)
    })

    for (const char of `~\`!@$%^&*()+=[]\\/|?><"':;,#{}\n`.split('')) {
      it(`rejects invalid character: ${char}`, () => {
        const testCase = JSON.parse(JSON.stringify(testUser))
        testCase.username = `user${char}name`

        const { error, value } = schema.validate(testCase)

        assert.strictEqual(
          error.message,
          `"username" with value "user${char}name" fails to match the required pattern: /^[a-zA-Z0-9 _.-]+$/`,
        )
        assert.deepStrictEqual(testCase, value)
      })
    }
  })

  describe('email', function () {
    it('accepts valid', () => {
      const testCase = JSON.parse(JSON.stringify(testUser))
      testCase.email = 'user@test.com'

      const { error, value } = schema.validate(testCase)

      assert.ifError(error)
      assert.equal(value.email, 'user@test.com')
    })

    it('rejects missing', () => {
      const testCase = JSON.parse(JSON.stringify(testUser))
      delete testCase.email

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(error.message, '"email" is required')
      assert.deepStrictEqual(testCase, value)
    })

    it('rejects invalid format', () => {
      const testCase = JSON.parse(JSON.stringify(testUser))
      testCase.email = 'user'

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(error.message, '"email" must be a valid email')
      assert.deepStrictEqual(value, testCase)
    })
  })

  describe('password', function () {
    it('accepts a strong password', () => {
      const testCase = JSON.parse(JSON.stringify(testUser))
      testCase.password = 'This 1 Is Very 3#$@!in Good'

      const { error, value } = schema.validate(testCase)

      assert.ifError(error)
      assert.deepStrictEqual(value, testCase)
    })

    it('rejects missing', () => {
      const testCase = JSON.parse(JSON.stringify(testUser))
      delete testCase.password

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(error.message, '"password" is required')
      assert.deepStrictEqual(testCase, value)
    })

    it('rejects too short password', () => {
      const testCase = JSON.parse(JSON.stringify(testUser))
      testCase.password = 'ab12!@'

      const { error, value } = schema.validate(testCase)

      assert.equal(
        error.message,
        '"password" length must be at least 8 characters long',
      )
      assert.deepStrictEqual(value, testCase)
    })

    it('rejects most common password strings', () => {
      const testCase = JSON.parse(JSON.stringify(testUser))
      testCase.password = 'bigLongpasswordWithabc12!@'

      const { error, value } = schema.validate(testCase)

      assert.equal(
        error.message,
        '"password" should not contain any of the following: password, abc',
      )
      assert.deepStrictEqual(value, testCase)
    })
  })
})
