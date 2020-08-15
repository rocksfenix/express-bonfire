/* global describe, it */
const expect = require('chai').expect
const getCode = require('../src/get-code')

describe('Test getCode Function', () => {
  it('Passing code inside parentheses', () => {
    const code = getCode('Example of code (5001)')
    expect(code).to.equal(5001)
  })

  it('Passing code inside parentheses and spaces', () => {
    const code = getCode('Example of code ( 478  )')
    expect(code).to.equal(478)
  })

  it('With other numbers', () => {
    const code = getCode('422 | Example of code ( 7512  )')
    expect(code).to.equal(7512)
  })

  it('With other numbers', () => {
    const code = getCode('204 | Yeep! (  891 )')
    expect(code).to.equal(891)
  })
})
