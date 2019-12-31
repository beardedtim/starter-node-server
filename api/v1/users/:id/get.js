module.exports = async (req, res) => {
  const data = await req.context.models.User.query()
    .findById(req.params.id)
    .select(['id', 'email', 'last_updated', 'created_at'])

  if (!data) {
    throw new req.context.errors.NotFound(`USER::${req.params.id}`)
  }

  res.json({
    data
  })
}
