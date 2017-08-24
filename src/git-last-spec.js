'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const execa = require('execa')
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
  const buildFilename = 'build.json'

  const deleteBuildFile = () => {
    if (exists(buildFilename)) {
      rm(buildFilename)
    }
  }

  const fileExists = () => {
    la(exists(buildFilename), 'cannot find file', buildFilename)
  }

  const fileIsValid = () => {
    const json = JSON.parse(read(buildFilename, 'utf8'))
    la(isBuildInfo(json), 'invalid build info in', buildFilename, json)
  }

  beforeEach(deleteBuildFile)
  afterEach(deleteBuildFile)

  it('is a function', () => {
    la(is.fn(gitLast))
  })

  it('saves valid json with -f', () =>
    execa('node', ['.', '-f', buildFilename])
      .then(fileExists)
      .then(fileIsValid))
})
