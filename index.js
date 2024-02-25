for (const l of [
  'group',
  'user',
  'session',
  'nameserver',
  'zone',
  'zone_record',
]) {
  module.exports[l] = require(`./lib/${l}`)
}
