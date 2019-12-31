const bodyParser = require('body-parser')

module.exports = [
  bodyParser.json(),
  async (req, res) => {
    await req.context.helpers.ensureAuthorized(
      {
        object: 'DB',
        action: 'MIGRATE'
      },
      req
    )

    const data = await req.context.db.migrate.latest()

    res.status(201).json({
      data
    })
  }
]
