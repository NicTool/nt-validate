const assert = require('node:assert/strict')
const { describe, it } = require('node:test')

const schema = require('./group').v2
const testGroup = require('../test/fixtures/v2/group.json')

describe('group', function () {
  describe('name', function () {
    it('accepts valid', () => {
      const testCase = JSON.parse(JSON.stringify(testGroup))

      const { error, value } = schema.validate(testCase)

      assert.ifError(error)
      assert.deepEqual(value, testCase)
    })

    it('rejects missing name', () => {
      const testCase = JSON.parse(JSON.stringify(testGroup))
      delete testCase.name

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(error.message, '"name" is required')
      assert.deepEqual(value, testCase)
    })

    it('rejects too short', () => {
      const testCase = JSON.parse(JSON.stringify(testGroup))
      testCase.name = 'gr'

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(
        error.message,
        '"name" length must be at least 3 characters long',
      )
      assert.deepEqual(value, testCase)
    })

    it('rejects too long', () => {
      const testCase = JSON.parse(JSON.stringify(testGroup))
      testCase.name =
        'abcdefghijklmopqrstuvwxyzabcdefghijklmopqrstuvwxyzabcdefghijklmopqrstuvwxyz' +
        'abcdefghijklmopqrstuvwxyzabcdefghijklmopqrstuvwxyzabcdefghijklmopqrstuvwxyz' +
        'abcdefghijklmopqrstuvwxyzabcdefghijklmopqrstuvwxyzabcdefghijklmopqrstuvwxyz' +
        'abcdefghijklmopqrstuvwxyzabcdefghijklmopqrstuvwxyzabcdefghijklmopqrstuvwxyz'

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(
        error.message,
        '"name" length must be less than or equal to 255 characters long',
      )
      assert.deepEqual(value, testCase)
    })

    for (const char of `~\`!$%^&*()+=[]\\/|?><":;,#{}\n`.split('')) {
      it(`rejects invalid character: ${char}`, () => {
        const testCase = JSON.parse(JSON.stringify(testGroup))
        testCase.name = `na${char}me`

        const { error, value } = schema.validate(testCase)

        assert.strictEqual(
          error.message,
          `"name" with value "na${char}me" fails to match the required pattern: /^[a-zA-Z0-9 _.@'-]+$/`,
        )
        assert.deepEqual(value, testCase)
      })
    }

    for (const t of ['-test', '_test', `'test`, '.test', '@test']) {
      it(`rejects if first character is not alphanumeric: ${t}`, () => {
        const testCase = JSON.parse(JSON.stringify(testGroup))
        testCase.name = t

        const { error, value } = schema.validate(testCase)

        assert.strictEqual(
          error.message,
          `"name" with value "${t}" fails to match the required pattern: /^[a-zA-Z0-9]/`,
        )
        assert.deepEqual(value, testCase)
      })
    }
  })
})
