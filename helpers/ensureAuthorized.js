const ensureAuthorized = async (partial_claim, req) => {
  if (!req.user) {
    throw new req.context.errors.NotAuthenticated()
  }

  const claim = {
    ...partial_claim,
    subject: req.user.id
  }

  const authorized = await req.context.helpers.isAuthorized(claim, req)

  if (!authorized) {
    throw new req.context.errors.NotAuthorized()
  }

  return req.user
}

module.exports = ensureAuthorized
