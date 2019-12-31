const bodyParser = require('body-parser')

module.exports = [
  bodyParser.json(),
  async (req, res) => {
    await req.context.helpers.ensureAuthorized(
      {
        object: 'DB',
        action: 'SEED'
      },
      req
    )

    const data = await req.context.db.seed.run()

    res.status(201).json({
      data
    })
  }
]
