const parseArgs = require('minimist')
const check = require('./check')

var { _: arguments } = parseArgs(process.argv.slice(2))

switch (arguments[0]) {
  case 'check':
    check()
    break

  default:
    console.log(`usage: sdg check`)
    break
}
