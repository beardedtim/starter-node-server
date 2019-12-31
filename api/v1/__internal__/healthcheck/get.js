const start = Date.now()

module.exports = async (req, res) => {
  const { rows } = await req.context.db.raw('SELECT NOW()')

  if (rows.length) {
    res.json({
      data: {
        healthy: true,
        tl: Date.now() - start
      }
    })
  }
}
