/* global describe, it */
const expect = require('chai').expect
const { dispatchError } = require('../src')

describe('Test dispatchError Function', () => {
  it('Test error message', () => {
    try {
      dispatchError('Whoops!!!')
    } catch (error) {
      expect(error.message).to.equal('Whoops!!!')
    }
  })

  it('Test error message with template string', () => {
    const id = 'sda5a4s65d'
    try {
      dispatchError(`The user with id ${id} is not found`)
    } catch (error) {
      expect(error.message).to.equal(`The user with id ${id} is not found`)
    }
  })

  it('Test parse status code HTTP 404', () => {
    try {
      dispatchError('404:Whoops!!!')
    } catch (error) {
      expect(error.statusHTTP).to.equal(404)
    }
  })

  it('Test parse status code HTTP 500', () => {
    try {
      dispatchError(' 500 : Whoops!!!')
    } catch (error) {
      expect(error.statusHTTP).to.equal(500)
    }
  })

  it('Test parse status code HTTP 202 with spaces', () => {
    try {
      dispatchError('202 :  Whoops!!!')
    } catch (error) {
      expect(error.statusHTTP).to.equal(202)
    }
  })

  it('Send extra data in extraData', () => {
    try {
      dispatchError('202 :  Whoops!!!', { moreInfo: 'Here!' })
    } catch (error) {
      expect(error.extraData.moreInfo).to.equal('Here!')
    }
  })
})
