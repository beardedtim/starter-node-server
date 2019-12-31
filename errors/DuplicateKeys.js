class DuplicateKeys extends Error {
  constructor(keys, resource = 'Resource') {
    const message = `DUPLICATE KEY${keys.length > 1 ? 'S' : ''}: ${keys.join(
      ','
    )} FOR RESOURCE ${resource}`

    super(message)

    this.code = 400
  }
}

module.exports = DuplicateKeys
