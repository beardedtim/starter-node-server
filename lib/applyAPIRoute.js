module.exports = API => async (req, res, next) => {
  const handler = await API
  return handler(req, res, next)
}
