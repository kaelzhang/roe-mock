const {Server} = require('roe-scripts')
const tmp = require('tmp-promise')
const supertest = require('supertest')
const fs = require('fs-extra')

class Mock {
  constructor (cwd, {
    dev = true,
    copy = false
  } = {}) {
    this._cwd = cwd
    this._dev = dev
    this._copy = copy
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
    this._server = new Server({
      cwd: this._copy
        ? await this.temp()
        : this._cwd,
      dev: this._dev
    })

    await this._server.ready()
    this._request = supertest(this._server.app.callback())
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
