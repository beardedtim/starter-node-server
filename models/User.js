const { Model } = require('objection')
const Password = require('objection-password')({ rounds: 10 })

class User extends Password(Model) {
  static get tableName() {
    return 'users'
  }
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
      }
    }
  }

  async $afterUpdate(opt, queryContext) {
    await super.$afterUpdate(opt, queryContext)

    delete this.password
  }

  async $afterInsert(queryContext) {
    await super.$afterInsert(queryContext)

    delete this.password
  }
}

module.exports = User
