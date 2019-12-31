module.exports = context => (req, _, next) => {
  req.context = context

  return next()
}
