const tmp = require('tmp-promise')
const supertest = require('supertest')
const fs = require('fs-extra')
const createNext = require('next')
const build = require('next/dist/build')
const {Roe} = require('roe')

class Mock {
  constructor (cwd, {
    copy = false,
    conf = {}
  } = {}) {
    this._cwd = cwd
    this._copy = copy
    this._conf = conf
  }

  async temp () {
    const {
      path: dir
    } = await tmp.dir()
    const real = await fs.realpath(dir)
    await fs.copy(this._cwd, real)
    return real
  }

  async ready () {
    const cwd = this._copy
      ? await this.temp()
      : this._cwd

    const next = createNext({
      dir: cwd,
      conf: this._conf,
      dev: true
    })

    await next.prepare()

    this._server = new Roe({
      baseDir: cwd,
      extends: {
        next
      }
    })

    await this._server.ready()
    this._request = supertest(this._server.callback())
  }

  get request () {
    return this._request
  }

  listen (...args) {
    this._server.listen(...args)
  }
}

module.exports = async (cwd, options) => {
  const mock = new Mock(cwd, options)
  await mock.ready()

  return {
    listen (...args) {
      mock.listen(...args)
    },
    __proto__: mock.request
  }
}
