const bodyParser = require('body-parser')

module.exports = [
  bodyParser.json(),
  async (req, res) => {
    await req.context.helpers.ensureAuthorized(
      {
        object: 'DB',
        action: 'ROLLBACK'
      },
      req
    )

    const data = await req.context.db.migrate.rollback(req.params.all)

    res.status(200).json({
      data
    })
  }
]
