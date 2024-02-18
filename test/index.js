const assert = require('node:assert/strict')

const schema = require('../index')

describe('index', function () {
  const testUser = require('./fixtures/user.json')

  it('exports login', () => {
    const testCase = JSON.parse(JSON.stringify(testUser))

    const { error, value } = schema.login.validate({
      username: testCase.username,
      password: testCase.password,
    })

    assert.ifError(error)
  })

  it('exports user', () => {
    const testCase = JSON.parse(JSON.stringify(testUser))
    const { error, value } = schema.user.validate(testCase)
    assert.ifError(error)
    assert.deepStrictEqual(testCase, value)
  })

  it('exports group', () => {
    const testCase = JSON.parse(JSON.stringify(require('./fixtures/group.json')))
    const { error, value } = schema.group.validate(testCase)
    assert.ifError(error)
    assert.deepStrictEqual(testCase, value)
  })
})
