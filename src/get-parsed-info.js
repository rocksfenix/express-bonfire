const getCleanMessage = require('./get-clean-message')
const getCodeStatusInfo = require('./get-code-status-info')
const getCode = require('./get-code')

/**
* @method getParsedInfo
* @param {Object} config - Config object {
    input: {String} - '404: Message here (58489)'
    divider: {String} - Divider for character ':' eg "404: "Resource not found"
    customSplitPattern: {RegExp} - To divider or split the text
  }
  @return {Object} - eg {
    code: 12,
    statusHTTP: 404,
    message: 'Wops',
    codeStatusHttp: '402: Payment Required'
  }
*/
const getParsedInfo = (config) => {
  const {
    input,
    divider,
    customSplitPattern
  } = config

  const splited = input
    .split(divider || customSplitPattern)
    .map(item => item.trim())
    .filter(item => (item !== '' || item !== undefined))

  const code = getCode(input)

  const data = {
    statusHTTP: null,
    message: '',
    infoStatusHttp: getCodeStatusInfo(code)
  }

  if (code !== 0) {
    data.code = code
  }

  if (splited.length === 1) {
    data.message = getCleanMessage(splited[0])
  }

  if (splited.length > 1) {
    data.message = getCleanMessage(splited[1])
  }

  if (!isNaN(parseInt(splited[0]))) {
    data.statusHTTP = parseInt(splited[0])
  }

  return data
}

module.exports = getParsedInfo
