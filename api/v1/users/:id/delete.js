module.exports = async (req, res) => {
  await req.context.helpers.ensureAuthorized(
    {
      object: `USERS::${req.params.id}`,
      action: 'DELETE'
    },
    req
  )

  const removed = await req.context.models.User.query()
    .deleteById(req.params.id)
    .returning(['id', 'email', 'created_at', 'last_updated'])

  res.status(200).json({
    data: removed
  })
}
