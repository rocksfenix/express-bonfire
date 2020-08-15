/**
* @method getSplitChar
* @param {String} message - '404 => example with'
* @param {Array} dividers - ['=>', '->']
* @return {String} '=>'
*/
const getSplitChar = (message, dividers) => {
  for (let i = 0; i < dividers.length; i++) {
    const char = dividers[i]
    if (message.indexOf(char) !== -1) {
      return char
    }
  }
}

module.exports = getSplitChar
