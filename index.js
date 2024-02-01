
for (const l of [ 'user',]) {
  module.exports[l] = require(`./lib/${l}`)[l]
}
