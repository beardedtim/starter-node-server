module.exports = async (err, req, res, _) => {
  req.context.log.error({ err })
  const message = err.message || 'Internal Server Error'
  const code = err.code && err.code > 99 && err.code < 600 ? err.code : 500

  if (err.setHeaders) {
    err.setHeaders(res)
  }

  res.status(code).json({
    error: {
      message,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
    }
  })
}
