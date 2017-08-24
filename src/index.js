#!/usr/bin/env node

const program = require('commander')
const ggit = require('ggit')

function getArguments (argv) {
  program
    .option('-f, --file <filename>', 'output JSON filename')
    .option('-m, --message', "add commit's abbreviated message to output")
    .parse(process.argv)
  return program
}

function gitLast (argv) {
  const args = getArguments(argv)
  const options = {
    file: args.file,
    message: args.message
  }
  return ggit.lastCommitId(options)
}

if (module.parent) {
  // eslint-disable-next-line immutable/no-mutation
  module.exports = gitLast
} else {
  gitLast(process.argv).done()
}
