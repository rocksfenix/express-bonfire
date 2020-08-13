/**
* This is a constructor for throw errors
* @method DispatchError
* @param {Object} config - Config object {
    statusHTTP: 200 - Status http send on request
    ------------------------------------------
    message: 'Something is wrong' - Error message for humans
    ------------------------------------------
    code: 0 - Error code message for apis
    ------------------------------------------
    divider: ':' - Divider for code example "404: "Resource not found"
    ------------------------------------------
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

  return (descriptor = '', extraData = {}) => {
    const parsed = descriptor
      .split(divider || customSplitPattern)
      .map(item => item.trim())
      .filter(item => item !== '')

    if (parsed.length === 1) {
      message = parsed[0].trim()
    }

    if (parsed.length > 1) {
      message = parsed[1].trim()
    }

    if (!isNaN(parseInt(parsed[0]))) {
      statusHTTP = parseInt(parsed[0])
    }

    const error = new Error(message)
    error.statusHTTP = statusHTTP
    error.extraData = extraData

    throw error
  }
}

module.exports = DispatchError
