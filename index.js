const fetch = require('cross-fetch')

module.exports = function dynamicImport(resource, options) {
  var opts = options || {}
  var globalKeys = []
  var globalValues = []
  if (opts.globals) {
    for (var key in opts.globals) {
      globalKeys.push(key)
      globalValues.push(opts.globals[key])
    }
  }
  return fetch(resource, opts.fetchOptions)
    .then(function (res) {
      if (!res.ok) {
        throw new Error('HTTPError: status ' + res.status)
      }
      return res.text()
    })
    .then(function (fn) {
      return Function.apply(
        undefined,
        globalKeys.concat('var module={exports:{}},exports=module.exports;\n' + fn + '\n;\nreturn module.exports')
      ).apply(undefined, globalValues)
    })
}
