const getParsedInfo = require('./get-parsed-info')

/**
* This is a constructor for throw errors
* @method DispatchError
* @param {Object} config - Config object {
    statusHTTP: 200 - Status http send on request
    message: 'Something is wrong' - Error message for humans
    code: 0 - Error code message for apis
    divider: ':' - Divider for code example "404: "Resource not found"
    customSplitPattern: null - RegExp for divider or split the text
  }
*/
const DispatchError = (config = {}) => {
  let {
    statusHTTP,
    message,
    divider,
    customSplitPattern
  } = config

  return (input = '', extraData = {}) => {
    const data = getParsedInfo({
      input,
      customSplitPattern,
      divider,
    })

    const error = new Error(data.message || message)
    error.statusHTTP = data.statusHTTP || statusHTTP
    error.infoStatusHttp = data.infoStatusHttp
    error.extraData = extraData
    error.code = data.code
    throw error
  }
}

module.exports = DispatchError
