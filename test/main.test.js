const { getFixtures } = require('../src')
const { expect, assert } = require('chai')

describe('getFixtures', function () {
  before(function (done) {
    /** extend timeout because puppeteer takes a while */
    this.timeout(10000)
    getFixtures().then(res => {
      this.data = res
      done()
    }).catch(err => {
      assert.fail(0, 1, 'Failed to fetch fixtures. URL could be broken or website is down.')
    })
  })

  it('It returns an array', function () {
    expect(this.data).to.be.an('array')
  })

  it('The array contains objects', function () {
    expect(this.data[0]).to.be.an('object')
  })

  it('The object has the expected properties', function () {
    const obj = this.data[0]

    expect(obj).to.have.property('scheduled')
    expect(obj).to.have.property('teams')
    expect(obj).to.have.nested.property('teams.home')
    expect(obj).to.have.nested.property('teams.away')
  })
})
