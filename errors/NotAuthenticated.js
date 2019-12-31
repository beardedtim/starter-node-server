class NotAuthenticated extends Error {
  constructor(
    msg = 'You are not authenticated to make that request. Please authenticate as an actor that can and try again.'
  ) {
    super(msg)

    this.code = 401
  }

  setHeaders(res) {
    res.set(
      'WWW-Authenticate',
      `Bearer relm="${process.env.NAME || '__STARTER__'}"`
    )

    res.set(
      'X-AUTH-ERROR',
      `You either gave us a bad Bearer token or you did not give us one at all.`
    )
  }
}

module.exports = NotAuthenticated
