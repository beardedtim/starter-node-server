module.exports = async (req, res) => {
  // if we have a user
  if (req.user) {
    // then we can just re-create their token for them
    const token = await req.context.helpers.createAuthToken(req.user)

    res.status(200).json({
      data: req.user,
      meta: {
        token
      }
    })
  } else {
    // if we don't, we can't verify their token so
    // we tell them they are not Authenticated
    throw new req.context.errors.NotAuthenticated()
  }
}
