const bodyParser = require('body-parser')

module.exports = [
  bodyParser.json(),
  async (req, res) => {
    try {
      const data = await req.context.models.User.query()
        .insert(req.body)
        .returning(['id', 'created_at', 'last_updated', 'email'])

      res.status(201).json({
        data
      })
    } catch (e) {
      // They tried to give us a duplicate key
      // when we really didn't want one
      if (e.name === 'UniqueViolationError') {
        throw new req.context.errors.DuplicateKeys(e.columns, 'User')
      } else {
        // Else, rethrow
        throw e
      }
    }
  }
]
