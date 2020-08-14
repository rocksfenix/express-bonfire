const { codePattern, cleanCodePattern } = require('./default-config')

const getCode = (input) => {
  let code = 0

  const matched = input.match(codePattern)

  if (matched) {
    code = parseInt(
      matched[0].replace(cleanCodePattern, '')
    )
  }
  return code
}

module.exports = getCode
