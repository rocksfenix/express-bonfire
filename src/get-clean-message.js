const { codePattern } = require('./default-config')

const getCleanMessage = (dirty) => {
  return dirty
    .replace(codePattern, '')
    .trim()
}

module.exports = getCleanMessage
