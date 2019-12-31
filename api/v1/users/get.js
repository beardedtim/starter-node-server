module.exports = async (req, res) => {
  const {
    limit = 100,
    offset = 0,
    sort_by = 'last_updated',
    sort_ord = 'DESC'
  } = req.query

  const data = await req.context.models.User.query()
    .select(['id', 'email', 'created_at', 'last_updated'])
    .limit(limit)
    .offset(offset)
    .orderBy(sort_by, sort_ord)

  res.json({
    data
  })
}
