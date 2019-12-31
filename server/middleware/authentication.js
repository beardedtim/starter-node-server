/**
 * Express Middleware for Decoding a JWT
 * and attaching it to the Request object
 */
module.exports = () => async (req, res, next) => {
  let user
  try {
    let token

    // Let's try to find a token
    if (req.headers.Authorization) {
      token = req.headers.Authorization.replace('Bearer ', '')
    } else if (req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '')
    } else if (req.cookies.authorization) {
      token = req.cookies.authorization
    }

    // If we found one
    if (token) {
      // And it is verified and valid
      const { data } = await req.context.helpers.validateAuthToken(token)

      // Set the user to be its value
      user = data
    }
  } catch (e) {
    req.context.log.info({ err: e, message: 'Authentication Error' })
  } finally {
    req.user = user
    next()
  }
}
