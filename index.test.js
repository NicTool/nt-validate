const assert = require('node:assert/strict')
const { describe, it } = require('node:test')

const schema = require('./index')

describe('index', function () {
  const testGroup = require('./test/fixtures/v2/group.json')
  const testUser = require('./test/fixtures/v2/user.json')
  const testNs = require('./test/fixtures/v2/nameserver.json')

  it('exports user', () => {
    const testCase = JSON.parse(JSON.stringify(testUser))
    const { error, value } = schema.user.v2.validate(testCase)
    assert.ifError(error)
    assert.deepEqual(testCase, value)
  })

  it('exports group', () => {
    const testCase = JSON.parse(JSON.stringify(testGroup))
    const { error, value } = schema.group.v2.validate(testCase)
    assert.ifError(error)
    assert.deepEqual(testCase, value)
  })

  it('exports nameserver', () => {
    const testCase = JSON.parse(JSON.stringify(testNs))
    const { error } = schema.nameserver.nameserver.validate(testCase)
    assert.ifError(error)
  })
})
