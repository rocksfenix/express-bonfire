// Default config
module.exports = {
  // Status http send on request
  statusHTTP: 200,
  // Error message for humans
  message: 'Something is wrong 🔥',
  // Error code message for apis
  errorCode: 0,
  // Dividers for split status http and
  // message eg: "404 => "Resource is not found"
  dividers: ['|', '=>', '->'],
  // RegExp for find the code eg: (874)
  codePattern: /\((\s+)?(\d*)(\s+)?\)/gm,
  // RegExp for clean and extract code from (874) => 874
  cleanCodePattern: /(\(|\))/gm
}
