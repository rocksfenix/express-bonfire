// Default config
module.exports = {
  // Status http send on request
  statusHTTP: 200,
  // Error message for humans
  message: 'Something is wrong 🔥',
  // Error code message for apis
  code: 0,
  // Divider for code example "404: "Resource not found"
  divider: ':',
  // RegExp for divider or split the text
  customSplitPattern: null,
  // RegExp for find the code eg: (874)
  codePattern: /\((\s+)?(\d*)(\s+)?\)/gm,
  // RegExp for clean and extract code from (874) => 874
  cleanCodePattern: /(\(|\))/gm
}
