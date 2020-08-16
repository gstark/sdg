#!/usr/bin/env node

const parseArgs = require('minimist')
const { check } = require('./check')
const { exec } = require('./utils')

var { _: arguments } = parseArgs(process.argv.slice(2))

switch (arguments[0]) {
  case 'check':
    check()
    break

  case 'toast':
    {
      const appName = arguments[1]
      const message = arguments[2]

      if (process.platform === 'win32') {
        exec(`${__dirname}/.bin/snoretoast -silent "${message}" -t "${appName}"`)
      } else {
        exec(
          `${__dirname}/.bin/terminal-notifier.app/Contents/MacOS/terminal-notifier -message "${message}" -title "${appName}"`
        )
      }
    }
    break

  default:
    console.log(`usage:\nsdg check - check installed SDG apps\nsdg toast MESSAGE APP - send a toast message`)
    break
}
