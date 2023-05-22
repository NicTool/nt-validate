
const ucFirst = s => s && s[0].toUpperCase() + s.slice(1)
const publicFields = [ 'username', 'email', 'first_name', 'last_name', 'password', 'user_id', 'group_id' ]
// const allFields = publicFields.concat[ 'deleted', 'is_admin', 'pass_salt' ]

class User {
  constructor (opts) {
    for (const f of publicFields) {
      if (opts[f] !== undefined) {
        this[`set${ucFirst(f)}`](opts[f])
      }
    }
  }

  setUsername (u) {
    if (u.length < 3) throw new Error('Username must be at least 3 characters.')
    if (u.length > 50) throw new Error('Username cannot exceed 50 characters.')
    if (/([^a-zA-Z0-9 \-_.])/.test(u)) throw new Error('Username contains an invalid character. Only A-Z, 0-9, _, -, . and [space] are allowed.')
    this.username = u
  }

  setEmail (e) {
    if (/^[^@]+@[^@.]+\..+$/.test(e)) {
      this.email = e
      return
    }
    throw new Error('Email must be a valid email address.')
  }

  setPassword (p) {
    if (p.length < 8) throw new Error('Password too short, must be 8-30 characters long.')
    if (p.length > 30) throw new Error('Password too long, must be 8-30 characters long.')
    if (this.username) {
      if (this.username === p) throw new Error('Password cannot be the same as username!')
      if (new RegExp(this.username, 'i').test(p)) throw new Error('Password cannot contain your username!')
    }
    this.password = p
  }

}

module.exports = User