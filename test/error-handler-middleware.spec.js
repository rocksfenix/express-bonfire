/* global describe, it */
const expect = require('chai').expect
const defaultConfig = require('../src/default-config')
const { errorMiddleware, dispatchError, DispatchErrorCustom } = require('../src')

describe('Test Middleware: errorMiddleware', () => {
  it('Test default config', () => {
    try {
      dispatchError()
    } catch (error) {
      // Mock response express.js methods
      const res = {
        status (code) {
          expect(code).to.equal(defaultConfig.statusHTTP)
          return this
        },
        json (data) {
          expect(data.message).to.equal(defaultConfig.message)
          return this
        }
      }

      errorMiddleware(error, {}, res)
    }
  })

  it('Test custom message', () => {
    try {
      dispatchError('♥')
    } catch (error) {
      // Mock response express.js methods
      const res = {
        status (code) {
          expect(code).to.equal(defaultConfig.statusHTTP)
          return this
        },
        json (data) {
          expect(data.message).to.equal('♥')
          return this
        }
      }

      errorMiddleware(error, {}, res)
    }
  })

  it('Test custom message and HTTP code 404', () => {
    try {
      dispatchError('404 : Not found ♥')
    } catch (error) {
      // Mock response express.js methods
      const res = {
        status (code) {
          expect(code).to.equal(404)
          return this
        },
        json (data) {
          expect(data.message).to.equal('Not found ♥')
          return this
        }
      }

      errorMiddleware(error, {}, res)
    }
  })

  it('Test custom message and HTTP code 500', () => {
    try {
      dispatchError('500 : Server on 🔥')
    } catch (error) {
      // Mock response express.js methods
      const res = {
        status (code) {
          expect(code).to.equal(500)
          return this
        },
        json (data) {
          expect(data.message).to.equal('Server on 🔥')
          return this
        }
      }

      errorMiddleware(error, {}, res)
    }
  })

  it('Test width extra data', () => {
    try {
      dispatchError('500 : Server on 🔥', {
        other: '🦾'
      })
    } catch (error) {
      // Mock response express.js methods
      const res = {
        status (code) {
          expect(code).to.equal(500)
          return this
        },
        json (data) {
          expect(data.message).to.equal('Server on 🔥')
          expect(data.other).to.equal('🦾')
          return this
        }
      }

      errorMiddleware(error, {}, res)
    }
  })
})

describe('Test Custom errorDispatchFunction', () => {
  const customDispatch = DispatchErrorCustom({
    message: 'Default message 😜',
    divider: '|',
    statusHTTP: 500
  })

  it('With default values', () => {
    try {
      customDispatch()
    } catch (error) {
      // Mock response express.js methods
      const res = {
        status (code) {
          expect(code).to.equal(500)
          return this
        },
        json (data) {
          expect(data.message).to.equal('Default message 😜')
          return this
        }
      }

      errorMiddleware(error, {}, res)
    }
  })

  it('Test custom divider |', () => {
    try {
      customDispatch('201 | Works!')
    } catch (error) {
      // Mock response express.js methods
      const res = {
        status (code) {
          expect(code).to.equal(201)
          return this
        },
        json (data) {
          expect(data.message).to.equal('Works!')
          return this
        }
      }

      errorMiddleware(error, {}, res)
    }
  })

  it('Test custom divider with RegExp', () => {
    const customDispatch = DispatchErrorCustom({
      customSplitPattern: /\*{2}/g
    })

    try {
      customDispatch('204 ** Yeep!')
    } catch (error) {
      // Mock response express.js methods
      const res = {
        status (code) {
          expect(code).to.equal(204)
          return this
        },
        json (data) {
          expect(data.message).to.equal('Yeep!')
          return this
        }
      }

      errorMiddleware(error, {}, res)
    }
  })
})
