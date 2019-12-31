class NotAuthorized extends Error {
  constructor(
    msg = 'You are not authorized to make that request. Please authenticate as an actor that can and try again.'
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
      'X-AUTHZ-ERROR',
      `You gave us a token that did not have the correct permissions for your request.`
    )
  }
}

module.exports = NotAuthorized
