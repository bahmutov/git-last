'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const execa = require('execa')
const R = require('ramda')
const { unlinkSync: rm, existsSync: exists, readFileSync: read } = require('fs')

/* eslint-env mocha */
const gitLast = require('.')
const isBuildInfo = is.schema({
  id: is.commitId,
  short: is.shortCommitId,
  savedAt: is.unemptyString,
  version: is.unemptyString
})

describe('git-last', () => {
  const isPR =
    'TRAVIS_PULL_REQUEST' in process.env &&
    process.env.TRAVIS_PULL_REQUEST !== 'false'

  if (isPR) {
    console.log('warning: this is Travis PR, probably from Renovate app')
    console.log('skipping some tests because cannot get commit message')
  }

  const buildFilename = 'build.json'

  const deleteBuildFile = () => {
    if (exists(buildFilename)) {
      rm(buildFilename)
    }
  }

  const fileExists = () => {
    la(exists(buildFilename), 'cannot find file', buildFilename)
  }

  const loadBuild = () => JSON.parse(read(buildFilename, 'utf8'))

  const fileIsValid = json => {
    la(json, 'missing json to check')
    la(isBuildInfo(json), 'invalid build info in', buildFilename, json)
  }

  const fileHasMessage = json => {
    la(is.unemptyString(json.message), 'missing message', buildFilename, json)
  }

  beforeEach(deleteBuildFile)
  afterEach(deleteBuildFile)

  it('is a function', () => {
    la(is.fn(gitLast))
  })

  it('saves valid json with -f', () => {
    // eslint-disable-next-line immutable/no-let
    let result
    return execa('node', ['.', '-f', buildFilename])
      .then(R.tap(r => (result = r)))
      .then(fileExists)
      .then(loadBuild)
      .then(fileIsValid)
      .catch(err => {
        console.error(err)
        console.error(result.stdout)
        console.error(result.stderr)
        throw err
      })
  })

  if (!isPR) {
    it('saves json with commit message for -m', () => {
      // eslint-disable-next-line immutable/no-let
      let result
      return execa('node', ['.', '-f', buildFilename, '-m'])
        .then(R.tap(r => (result = r)))
        .then(fileExists)
        .then(loadBuild)
        .then(R.tap(fileIsValid))
        .then(fileHasMessage)
        .catch(err => {
          console.error(err)
          console.error(result.stdout)
          console.error(result.stderr)
          throw err
        })
    })
  }

  if (!isPR) {
    it('saves json with commit message for --message', () => {
      // eslint-disable-next-line immutable/no-let
      let result
      return execa('node', ['.', '-f', buildFilename, '--message'])
        .then(R.tap(r => (result = r)))
        .then(fileExists)
        .then(loadBuild)
        .then(R.tap(fileIsValid))
        .then(fileHasMessage)
        .catch(err => {
          console.error(err)
          console.error(result.stdout)
          console.error(result.stderr)
          throw err
        })
    })
  }
})
