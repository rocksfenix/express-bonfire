const getParsedInfo = require('./get-parsed-info')

/**
* This is a constructor for throw errors
* @method DispatchError
* @param {Object} config - Config object {
    statusHTTP: 200 - Status http send on request
    message: 'Something is wrong' - Error message for humans
    code: 0 - Error code message for apis
    dividers: ['|', '=>', '->'] - eg: "404 => "Resource is not found"
  }
*/
const DispatchError = (config = {}) => {
  const {
    statusHTTP,
    message,
    dividers,
    customSplitPattern,
    errorCode
  } = config

  return (input = '', extraData = {}) => {
    const data = getParsedInfo({
      input,
      customSplitPattern,
      dividers,
      statusHTTP
    })

    const error = new Error(data.message || message)
    error.errorCode = data.errorCode || errorCode
    error.statusHTTP = data.statusHTTP
    error.infoStatusHttp = data.infoStatusHttp
    error.extraData = extraData
    throw error
  }
}

module.exports = DispatchError
