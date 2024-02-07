const assert = require('node:assert/strict')

const schema = require('../lib/nameserver').nameserver
const testNS = require('./fixtures/nameserver.json')

describe('nameserver', function () {
  describe('name', function () {
    it(`rejects missing`, () => {
      const testCase = JSON.parse(JSON.stringify(testNS))
      delete testCase.name

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(error.message, '"name" is required')
      assert.deepStrictEqual(testCase, value)
    })

    for (const n of [
      'good-ns.tld.',
      'a.b.c.',
      'host.tld.',
      'host.name.',
      'valid-ns.sld.',
      'wooki.tld.',
    ]) {
      it(`accepts valid: ${n}`, () => {
        const testCase = JSON.parse(JSON.stringify(testNS))
        testCase.name = n

        const { error, value } = schema.validate(testCase)

        assert.ifError(error)
        assert.deepStrictEqual(testCase, value)
      })
    }

    const errMsgs = [
      '"name" must be a valid hostname',
      '"name" must contain a valid domain name',
    ]

    const invalid_names = [
      '-bad_ns',
      'bad.-domain',
      'host',
      'bad_ns',
      'über',
      'ns..somewhere.com.',
      'ns.-something.com.',
    ]
    const invalid_chars = `~\`!@$%^&*()_+=[]\\/|?><"':;,#{} \n`
      .split('')
      .map((a) => `a.b${a}d.com.`)

    for (const n of [...invalid_names, ...invalid_chars]) {
      it(`rejects invalid: ${n}`, function () {
        const testCase = JSON.parse(JSON.stringify(testNS))
        testCase.name = n

        const { error, value } = schema.validate(testCase)

        assert.ok(errMsgs.includes(error.message))
        assert.deepStrictEqual(testCase, value)
      })
    }
  })

  describe('export_type', function () {
    it(`rejects missing`, () => {
      const testCase = JSON.parse(JSON.stringify(testNS))
      delete testCase.export_type

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(error.message, '"export_type" is required')
      assert.deepStrictEqual(testCase, value)
    })

    for (const n of [
      'bind',
      'djbdns',
      'knot',
      'nsd',
      'maradns',
      'powerdns',
      'dynect',
    ]) {
      it(`accepts valid: ${n}`, () => {
        const testCase = JSON.parse(JSON.stringify(testNS))
        testCase.export_type = n

        const { error, value } = schema.validate(testCase)

        assert.ifError(error)
        assert.deepStrictEqual(testCase, value)
      })
    }

    for (const n of [
      'cryptic',
      'fuzzy',
      'yitizg',
      'bin',
      'djbs',
      'DJB',
      'BIND',
      'NT',
    ]) {
      it(`rejects invalid: ${n}`, () => {
        const testCase = JSON.parse(JSON.stringify(testNS))
        testCase.export_type = n

        const { error, value } = schema.validate(testCase)

        assert.strictEqual(
          error.message,
          '"export_type" must be one of [bind, djbdns, knot, nsd, maradns, powerdns, dynect]',
        )
        assert.deepStrictEqual(testCase, value)
      })
    }
  })

  describe('nt_group_id', function () {
    it(`accepts valid`, () => {
      const testCase = JSON.parse(JSON.stringify(testNS))

      const { error, value } = schema.validate(testCase)

      assert.ifError(error)
      assert.deepStrictEqual(testCase, value)
    })

    it(`rejects missing`, () => {
      const testCase = JSON.parse(JSON.stringify(testNS))
      delete testCase.nt_group_id

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(error.message, '"nt_group_id" is required')
      assert.deepStrictEqual(testCase, value)
    })

    for (const gid of [1]) {
      it(`accepts valid: ${gid}`, () => {
        const testCase = JSON.parse(JSON.stringify(testNS))
        testCase.nt_group_id = gid

        const { error, value } = schema.validate(testCase)

        assert.ifError(error)
        assert.deepStrictEqual(testCase, value)
      })
    }

    for (const gid of ['abc']) {
      it(`rejects invalid: ${gid}`, () => {
        const testCase = JSON.parse(JSON.stringify(testNS))
        testCase.nt_group_id = gid

        const { error, value } = schema.validate(testCase)

        assert.strictEqual(error.message, '"nt_group_id" must be a number')
        assert.deepStrictEqual(testCase, value)
      })
    }
  })

  describe('address', function () {
    it(`accepts valid`, () => {
      const testCase = JSON.parse(JSON.stringify(testNS))

      const { error, value } = schema.validate(testCase)

      assert.ifError(error)
      assert.deepStrictEqual(testCase, value)
    })

    it(`rejects missing`, () => {
      const testCase = JSON.parse(JSON.stringify(testNS))
      delete testCase.address

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(error.message, '"address" is required')
      assert.deepStrictEqual(testCase, value)
    })

    for (const gid of ['1.2.3.4']) {
      it(`accepts valid: ${gid}`, () => {
        const testCase = JSON.parse(JSON.stringify(testNS))
        testCase.address = gid

        const { error, value } = schema.validate(testCase)

        assert.ifError(error)
        assert.deepStrictEqual(testCase, value)
      })
    }

    for (const addr of [
      '1.x.2.3',
      '.1.2.3',
      '1234.1.2.3',
      '256.2.3.4',
      '1.-.2.3',
      '1.2.3',
      '1.2',
      '1',
      '1.2.3.',
      '-1.2.3.4',
      '1. .3.4',
      '1.2,3.4',
      '1.,.3.4',
    ]) {
      it(`rejects invalid: ${addr}`, () => {
        const testCase = JSON.parse(JSON.stringify(testNS))
        testCase.address = addr

        const { error, value } = schema.validate(testCase)

        assert.strictEqual(
          error.message,
          '"address" must be a valid ip address of one of the following versions [ipv4] with a forbidden CIDR',
        )
        assert.deepStrictEqual(testCase, value)
      })
    }
  })

  describe('ttl', function () {
    it(`accepts valid`, () => {
      const testCase = JSON.parse(JSON.stringify(testNS))

      const { error, value } = schema.validate(testCase)

      assert.ifError(error)
      assert.deepStrictEqual(testCase, value)
    })

    it(`rejects missing`, () => {
      const testCase = JSON.parse(JSON.stringify(testNS))
      delete testCase.ttl

      const { error, value } = schema.validate(testCase)

      assert.strictEqual(error.message, '"ttl" is required')
      assert.deepStrictEqual(testCase, value)
    })

    for (const ttl of []) {
      it(`accepts valid: ${ttl}`, () => {
        const testCase = JSON.parse(JSON.stringify(testNS))
        testCase.ttl = ttl

        const { error, value } = schema.validate(testCase)

        assert.ifError(error)
        assert.deepStrictEqual(testCase, value)
      })
    }

    const validErrs = [
      '"ttl" must be greater than -1',
      '"ttl" must be a number',
      '"ttl" must be less than or equal to 2147483647',
    ]

    // Clarifications to the DNS specification: http://tools.ietf.org/html/rfc2181
    // valid TTL is unsigned number from 0 to 2147483647

    for (const ttl of [-299, -2592001, -2, -1, 2147483648, 'oops']) {
      it(`rejects invalid: ${ttl}`, () => {
        const testCase = JSON.parse(JSON.stringify(testNS))
        testCase.ttl = ttl

        const { error, value } = schema.validate(testCase)

        assert.ok(validErrs.includes(error.message))
        assert.deepStrictEqual(testCase, value)
      })
    }
  })
})
