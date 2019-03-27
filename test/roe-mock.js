const path = require('path')
const test = require('ava')
const fs = require('fs-extra')
const create = require('../src')

const fixture = (...args) => path.join(__dirname, 'fixtures', ...args)

test.before(async () => {
  try {
    await fs.remove(fixture('.next'))
  } catch (err) {

  }
})

test('normal', async t => {

  const mock = await create(fixture())

  const {text} = await mock
  .get('/hello')
  .expect(200)

  t.is(text, 'hello')
})

test('copy', async t => {
  const mock = await create(fixture(), {
    copy: true
  })

  const {text} = await mock
  .get('/hello')
  .expect(200)

  t.is(text, 'hello')
})
