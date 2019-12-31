class NotFound extends Error {
  constructor(obj) {
    const [resource = 'Resource', resource_id] = obj.split('::')
    super(
      `Resource ${resource} ${
        resource_id ? `of ID ${resource_id}` : ''
      } could not be found. Please check the query and try again.`
    )

    this.code = 404
  }
}

module.exports = NotFound
