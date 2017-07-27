#!/usr/bin/env node

const program = require('commander')
const ggit = require('ggit')

function getArguments (argv) {
  program
    .option('-f, --file <filename>', 'output JSON filename')
    .parse(process.argv)
  return program
}

function gitLast (argv) {
  const args = getArguments(argv)
  return ggit.lastCommitId(args)
}

if (module.parent) {
  // eslint-disable-next-line immutable/no-mutation
  module.exports = gitLast
} else {
  gitLast(process.argv).done()
}
