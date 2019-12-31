const bodyParser = require('body-parser')

module.exports = [
  bodyParser.json(),
  async (req, res) => {
    const user = await req.context.models.User.query()
      .first()
      .where({ email: req.body.email })

    if (!user) {
      throw new req.context.errors.NotAuthorized()
    }

    const match = await user.verifyPassword(req.body.password)

    if (!match) {
      throw new req.context.errors.NotAuthorized()
    }

    const { password, ...userObj } = user

    const token = await req.context.helpers.createAuthToken(userObj)

    res.status(200).json({
      data: userObj,
      meta: {
        token
      }
    })
  }
]
