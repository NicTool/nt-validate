for (const l of ['group', 'user', 'nameserver', 'zone', 'zone_record']) {
  module.exports[l] = require(`./lib/${l}`)
}
