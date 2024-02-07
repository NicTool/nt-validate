const assert = require('node:assert/strict')

const schema = require('../lib/group').group
const testGroup = require('./fixtures/group.json')

describe('group', function () {
  describe('name', function () {
    it('accepts valid', () => {
      const testCase = JSON.parse(JSON.stringify(testGroup))

      const { error, value } = schema.validate(testCase)

      assert.ifError(error)
      assert.deepStrictEqual(testCase, value)
    })

    it('rejects missing name', () => {
      const testCase = JSON.parse(JSON.stringify(testGroup))
      delete testCase.name

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(error.message, '"name" is required')
      assert.deepStrictEqual(testCase, value)
    })

    it('rejects too short', () => {
      const testCase = JSON.parse(JSON.stringify(testGroup))
      testCase.name = 'gr'

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(
        error.message,
        '"name" length must be at least 3 characters long',
      )
      assert.deepStrictEqual(testCase, value)
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
      assert.deepStrictEqual(testCase, value)
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
        assert.deepStrictEqual(testCase, value)
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
        assert.deepStrictEqual(testCase, value)
      })
    }
  })
})
