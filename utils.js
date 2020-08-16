const compareVersions = require('compare-versions')
const { promisify } = require('util')
const execChildProcess = promisify(require('child_process').exec)
const commandExistsSync = require('command-exists').sync
const { parse } = require('comment-json')
const fs = require('fs')

const exec = command => execChildProcess(command).catch(ex => Promise.resolve({ stdout: ex.message, stderr: '' }))

async function runCommandAndCheckVersion(command, commandLine, versionRegexp, minVersion) {
  if (!commandExistsSync(command)) {
    return { ok: false, result: 'Not installed' }
  }

  const { stdout } = await exec(commandLine)
  const {
    groups: { version },
  } = stdout.match(versionRegexp) || { groups: { version: '0.0.0' } }

  const ok = compareVersions.compare(version, minVersion, '>=')

  return {
    ok,
    result: `Installed version: ${version}, minimum version required: ${minVersion}`,
  }
}

async function runCommandAndCheckRegexp(commandLine, versionRegexp) {
  const { stdout, stderr } = await exec(commandLine)
  const ok = versionRegexp.test(stdout)

  return { ok, result: 'Not installed!' }
}

async function checkForPresenceOfWindowsApp(appName) {
  if (process.platform === 'win32') {
    const uninstallResults = await runCommandAndCheckRegexp(
      'PowerShell -Command "& { Get-ChildItem HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall }"',
      new RegExp(`.*${appName}.*`, 'i')
    )

    if (uninstallResults.ok) {
      return uninstallResults
    }
  }

  return await runCommandAndCheckRegexp(`scoop info ${appName}`, /.*Installed:\s*$/m)
}

async function checkForPresenceOfMacApp(appName) {
  return await runCommandAndCheckRegexp('system_profiler SPApplicationsDataType', new RegExp(`.*${appName}.*`, 'i'))
}

function getJSONFromFile(path) {
  return parse(fs.readFileSync(path, 'UTF-8'))
}

const checkForApp = process.platform === 'win32' ? checkForPresenceOfWindowsApp : checkForPresenceOfMacApp

exports.exec = exec
exports.runCommandAndCheckVersion = runCommandAndCheckVersion
exports.runCommandAndCheckRegexp = runCommandAndCheckRegexp
exports.checkForApp = checkForApp
exports.getJSONFromFile = getJSONFromFile
