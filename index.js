const { user, login } = require('./lib/user')
module.exports.user = user
module.exports.login = login

for (const l of ['group', 'nameserver', 'zone', 'zone_record']) {
  module.exports[l] = require(`./lib/${l}`)[l]
}
