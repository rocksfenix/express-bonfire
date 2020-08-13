const defaultConfig = require('./default-config')
const DispatchErrorBase = require('./dispatch-error-base')

exports.dispatchError = DispatchErrorBase(defaultConfig)
exports.errorMiddleware = require('./error-handler-middleware')
exports.DispatchErrorCustom = DispatchErrorBase
