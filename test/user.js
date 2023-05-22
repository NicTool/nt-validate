const assert = require('node:assert/strict')

const User = require('../index')

describe('user', function () {
  describe('new', function () {
    it('instantiates a user instance', () => {
      const u = new User({ username: 'unit-test' })
      assert.equal(u.username, 'unit-test')
    })
  })

  describe('username', function () {
    it('rejects username too short ', () => {
      assert.throws(
        () => new User({ username: 'u' }),
        { message: 'Username must be at least 3 characters.' }
      )
    })

    it('rejects username too long', () => {
      assert.throws(
        () => new User({ username: 'abcdefghijklmopqrstuvwxyzabcdefghijklmopqrstuvwxyzabcdefghijklmopqrstuvwxyz' }),
        { message: 'Username cannot exceed 50 characters.' }
      )
    })
  })

  describe('email', function () {
    it('accepts valid email address format', () => {
      const u = new User({ email: 'user@test.com' })
      assert.equal(u.email, 'user@test.com')
    })

    it('rejects invalid email address format', () => {
      assert.throws(
        () => new User({ email: 'user' }),
        { message: 'Email must be a valid email address.' }
      )
    })
  })

  describe('password', function () {
    it('accepts a strong password', () => {
      const u = new User({ password: 'This One Is Very #$@!in Good' })
      assert.ok(u instanceof User)
      assert.equal(u.password, 'This One Is Very #$@!in Good')
    })

    it('rejects a short password', () => {
      assert.throws(() => new User({ password: 'wee' }),
        { message: 'Password too short, must be 8-30 characters long.' }
      )
    })

    it('rejects password same as username', () => {
      assert.throws(
        () => new User({ username: 'username', password: 'username' }),
        { message: 'Password cannot be the same as username!' }
      )
    })

    it('rejects password contains username', () => {
      assert.throws(
        () => new User({ username: 'user', password: 'bigLongPassWithUsername' }),
        { message: 'Password cannot contain your username!' }
      )
    })
  })
})