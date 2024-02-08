for (const l of ['user', 'group', 'nameserver', 'zone', 'zone_record']) {
  module.exports[l] = require(`./lib/${l}`)[l]
}
