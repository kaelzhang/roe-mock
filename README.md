[![Build Status](https://travis-ci.org/kaelzhang/roe-mock.svg?branch=master)](https://travis-ci.org/kaelzhang/roe-mock)
[![Coverage](https://codecov.io/gh/kaelzhang/roe-mock/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/roe-mock)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/roe-mock?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/roe-mock)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/roe-mock.svg)](http://badge.fury.io/js/roe-mock)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/roe-mock.svg)](https://www.npmjs.org/package/roe-mock)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/roe-mock.svg)](https://david-dm.org/kaelzhang/roe-mock)
-->

# roe-mock

Mock of roe server for testing

## Install

```sh
$ npm i roe-mock
```

## Usage

```js
const path = require('path')
const create = require('roe-mock')

const baseDir = path.join(__dirname, 'fixtures', 'myApp')
const mock = await create(baseDir)

// Write test cases as well as supertest
await mock.get('/foo/bar')
.expect(200)
```

## create(baseDir, options?)

- **baseDir** `path` base directory contains the roe app
- **options?** `Object`
  - **copy?** `boolean=false` if true, roe-mock will copy things inside `baseDir` to an temp dir before creating the application

Creates an [`supertest`](https://npmjs.org/package/supertest) instance with an additional method `listen(port)` to start the server:

```js
const {
  listen
} = await create(baseDir)

listen(8888) // Server started at 127.0.0.1:8888
```

## License

MIT
