const IS_DEV = (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'dev'
)

/**
* This is an express middleware funcion
* @method handleError
* @param {Object} error - Error object by throw new Error()
* @param {Object} req - Object request from express route handler
* @param {Object} res - Object response from express route handler
*/
const handleError = (error, req, res) => {
  const info = {}

  if (IS_DEV) {
    console.error('Error', error)
    info.errorStack = error.stack
  }

  const { message, statusHTTP, code } = error

  res
    .status(statusHTTP)
    .json({
      error: true,
      message,
      code,
      ...info,
      ...error.extraData
    })
}

module.exports = handleError
