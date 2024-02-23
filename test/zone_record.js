const assert = require('node:assert/strict')
const { describe, it } = require('node:test')

const schema = require('../lib/zone_record').zone_record
const testZR = require('./fixtures/v2/zone_record.json')

describe('zone_record', function () {
  describe('nt_zone_id', function () {
    it(`accepts valid`, () => {
      const testCase = JSON.parse(JSON.stringify(testZR))
      const { error, value } = schema.validate(testCase)
      assert.ifError(error)
      assert.deepEqual(value, testCase)
    })

    it(`rejects missing`, () => {
      const testCase = JSON.parse(JSON.stringify(testZR))
      delete testCase.nt_zone_id
      const { error, value } = schema.validate(testCase)
      assert.strictEqual(error.message, '"nt_zone_id" is required')
      assert.deepEqual(value, testCase)
    })

    it(`rejects empty`, () => {
      const testCase = JSON.parse(JSON.stringify(testZR))
      testCase.nt_zone_id = ''
      const { error, value } = schema.validate(testCase)
      assert.strictEqual(error.message, '"nt_zone_id" must be a number')
      assert.deepEqual(value, testCase)
    })

    const errMsgs = [
      '"nt_zone_id" must be a positive number',
      '"nt_zone_id" must be a number',
    ]

    for (const zid of ['abc', 0]) {
      it(`rejects invalid: ${zid}`, () => {
        const testCase = JSON.parse(JSON.stringify(testZR))
        testCase.nt_zone_id = zid
        const { error, value } = schema.validate(testCase)
        assert.ok(errMsgs.includes(error.message))
        assert.deepEqual(value, testCase)
      })
    }
  })

  describe('name', function () {
    it(`accepts valid`, () => {
      const testCase = JSON.parse(JSON.stringify(testZR))
      const { error, value } = schema.validate(testCase)
      assert.ifError(error)
      assert.deepEqual(value, testCase)
    })

    it(`rejects missing`, () => {
      const testCase = JSON.parse(JSON.stringify(testZR))
      delete testCase.name
      const { error } = schema.validate(testCase)
      assert.strictEqual(error.message, '"name" is required')
    })

    it(`rejects empty`, () => {
      const testCase = JSON.parse(JSON.stringify(testZR))
      testCase.name = ''
      const { error } = schema.validate(testCase)
      assert.strictEqual(error.message, '"name" is not allowed to be empty')
    })

    for (const name of ['a.m.', 'something.test.']) {
      it(`rejects invalid: ${name}`, () => {
        const testCase = JSON.parse(JSON.stringify(testZR))
        testCase.name = name
        const { error } = schema.validate(testCase)
        assert.deepEqual(
          error.message,
          '"name" must contain a valid domain name',
        )
      })
    }
  })

  describe('type', function () {
    it(`rejects missing`, () => {
      const testCase = JSON.parse(JSON.stringify(testZR))
      delete testCase.type
      const { error } = schema.validate(testCase)
      assert.strictEqual(error.message, '"type" is required')
    })

    for (const type of ['A', 'AAAA', 'PTR']) {
      it(`accepts valid: ${type}`, () => {
        const testCase = JSON.parse(JSON.stringify(testZR))
        testCase.type = type
        const { error, value } = schema.validate(testCase)
        assert.ifError(error)
        assert.deepEqual(value, testCase)
      })
    }

    for (const type of ['', 0, 'abc']) {
      it(`rejects invalid: ${type}`, () => {
        const testCase = JSON.parse(JSON.stringify(testZR))
        testCase.type = type
        const { error } = schema.validate(testCase)
        assert.deepEqual(
          error.message,
          '"type" must be one of [A, AAAA, PTR, MX, NS, CNAME, SRV]',
        )
      })
    }
  })

  describe('ttl', function () {
    it(`rejects missing`, () => {
      const testCase = JSON.parse(JSON.stringify(testZR))
      delete testCase.ttl

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(error.message, '"ttl" is required')
      assert.deepEqual(value, testCase)
    })
  })
})
