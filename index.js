const fetch = require('cross-fetch')

module.exports = function dynamicImport(resource, options) {
  return fetch(resource, (options || {}).fetchOptions)
    .then(function (res) {
      if (!res.ok) {
        throw new Error('HTTPError: status ' + res.status)
      }
      return res.text()
    })
    .then(function (fn) {
      return (new Function('var module = { exports: {} }, exports = module.exports;\n' + fn + '\n;\nreturn module.exports'))()
    })
}
