'use strict'

const qs = require('qs')
const chai = require('chai')
const expect = chai.expect
const app = require('./app')
chai.use(require('chai-http'))
chai.use(require('chai-string'))
chai.use(require('chai-arrays'))

describe('test order', () => {

  it(`should returns options with ASC createdAt`, async () => {
    const query = qs.stringify({ order: 'createdAt' })
    const { body } = await chai.request(app).get(`/?${query}`)
    expect(body).to.have.property('options')
    expect(body.options).to.have.property('sort')
    expect(body.options.sort).to.have.property('createdAt')
    expect(body.options.sort.createdAt).to.equal(1)
  })

  it(`should returns options with DESC createdAt and ASC name`, async () => {
    const query = qs.stringify({ order: '-createdAt,name' })
    const { body } = await chai.request(app).get(`/?${query}`)
    expect(body).to.have.property('options')
    expect(body.options).to.have.property('sort')
    expect(body.options.sort).to.have.property('createdAt')
    expect(body.options.sort.createdAt).to.equal(-1)
    expect(body.options.sort).to.have.property('name')
    expect(body.options.sort.name).to.equal(1)
  })

})

describe('test limit', () => {

  it(`should returns options with limit equal to 1000 (default)`, async () => {
    const { body } = await chai.request(app).get(`/`)
    expect(body).to.have.property('options')
    expect(body.options).to.have.property('limit')
    expect(body.options.limit).to.equal(1000)
  })

  it(`should returns options with limit equal to 50`, async () => {
    const query = qs.stringify({ limit: 50 })
    const { body } = await chai.request(app).get(`/?${query}`)
    expect(body).to.have.property('options')
    expect(body.options).to.have.property('limit')
    expect(body.options.limit).to.equal(50)
  })

  it(`should returns options with limit equal to 9999 (limit = 20000)`, async () => {
    const query = qs.stringify({ limit: 20000 })
    const { body } = await chai.request(app).get(`/?${query}`)
    expect(body).to.have.property('options')
    expect(body.options).to.have.property('limit')
    expect(body.options.limit).to.equal(9999)
  })

  it(`should returns options with skip equal to 10`, async () => {
    const query = qs.stringify({ skip: 10 })
    const { body } = await chai.request(app).get(`/?${query}`)
    expect(body).to.have.property('options')
    expect(body.options).to.have.property('skip')
    expect(body.options.skip).to.equal(10)
  })

  it(`should returns options with skip equal to 20`, async () => {
    const query = qs.stringify({ offset: 20 })
    const { body } = await chai.request(app).get(`/?${query}`)
    expect(body).to.have.property('options')
    expect(body.options).to.have.property('skip')
    expect(body.options.skip).to.equal(20)
  })

})

describe('test deleted', () => {

  it(`should returns options with deleted equal to false (defalut)`, async () => {
    const { body } = await chai.request(app).get(`/`)
    expect(body).to.have.property('options')
    expect(body.options).to.have.property('deleted')
    expect(body.options.deleted).to.equal(false)
  })

  it(`should returns options with deleted equal to true (deleted = 'true')`, async () => {
    const query = qs.stringify({ deleted: true })
    const { body } = await chai.request(app).get(`/?${query}`)
    expect(body).to.have.property('options')
    expect(body.options).to.have.property('deleted')
    expect(body.options.deleted).to.equal(true)
  })

  it(`should returns options with deleted equal to true (deleted = 1)`, async () => {
    const query = qs.stringify({ deleted: 1 })
    const { body } = await chai.request(app).get(`/?${query}`)
    expect(body).to.have.property('options')
    expect(body.options).to.have.property('deleted')
    expect(body.options.deleted).to.equal(true)
  })

})

describe('test filter', () => {

  it(`should returns filter with name equal to 'John'`, async () => {
    const query = qs.stringify({ name: 'John' })
    const { body } = await chai.request(app).get(`/?${query}`)
    expect(body).to.have.property('filter')
    expect(body.filter).to.have.property('name')
    expect(body.filter.name).to.equal('John')
  })

  it(`should returns filter with updatedAt greater than equal to today (YYYY-MM-DD)`, async () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = today.getMonth() + 1
    const dd = today.getDay()
    const query = qs.stringify({ 'updatedAt>': `${yyyy}-${mm}-${dd}` })
    const { body } = await chai.request(app).get(`/?${query}`)
    expect(body).to.have.property('filter')
    expect(body.filter).to.have.property('updatedAt')
    expect(body.filter.updatedAt).to.have.property('$gte')
    expect(new Date(body.filter.updatedAt.$gte).toDateString()).to.equal(new Date(`${yyyy}-${mm}-${dd}`).toDateString())
  })

  it(`should returns filter with updatedAt greater than equal to today (timestamp)`, async () => {
    const today = new Date()
    const timestamp = Math.floor(today.getTime() / 1000)
    const query = qs.stringify({ 'updatedAt>': timestamp })
    const { body } = await chai.request(app).get(`/?${query}`)
    expect(body).to.have.property('filter')
    expect(body.filter).to.have.property('updatedAt')
    expect(body.filter.updatedAt).to.have.property('$gte')
    expect(new Date(body.filter.updatedAt.$gte).toDateString()).to.equal(new Date(timestamp * 1000).toDateString())
  })

})



describe('test q', () => {

  it(`should returns filter with name q equal to 'Peter'`, async () => {
    const query = qs.stringify({ q: 'Peter' })
    const { body } = await chai.request(app).get(`/?${query}`)
    expect(body).to.have.property('filter')
    expect(body.filter).to.have.property('$or')
    expect(body.filter.$or).to.be.array()
    expect(body.filter.$or[0]).to.have.property('name')
    expect(body.filter.$or[0].name).to.have.property('$regex')
    expect(body.filter.$or[0].name.$regex).to.equal('Peter')
    expect(body.filter.$or[0].name).to.have.property('$options')
    expect(body.filter.$or[0].name.$options).to.equal('i')
  })

})
