# git-last

> Shows last git commit SHA or/and saves it in a JSON file

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]
[![renovate-app badge][renovate-badge]][renovate-app]

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save git-last
```

## Use

Call from CLI to either show or save commit id into a file

```bash
$(npm bin)/git-last -f build.json
saved last commit d9a0dc152... (short d9a0dc1) in file build.json
last commit: d9a0dc152...
cat build.json
{
  "id": "d9a0dc15206396663e7c8f29aea07be8534c2ae4",
  "short": "d9a0dc1",
  "savedAt": "2017-07-27T14:37:06.850Z",
  "version": "0.0.0-development"
}
```

If available, will load `package.json` and will save its version in the output
file as well

For my convenience there is also same timestamp but in Eastern Time Zone.

If you pass `-m` or `--message` option, the saved file will have commit's abbreviated
message (like first 15 characters). This makes finding the deployed commit much faster.

## Related

* [ggit](https://github.com/bahmutov/ggit#readme) - Node API to Git commands

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/git-last/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/git-last.svg?downloads=true
[npm-url]: https://npmjs.org/package/git-last
[ci-image]: https://travis-ci.org/bahmutov/git-last.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/git-last
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
