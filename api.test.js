const request = require('supertest')

const createServer = require('./createServer')

const server = createServer()

describe('API', () => {
  describe('/_available', () => {
    it('returns a list of available routes', () =>
      request(server)
        .get('/_available')
        .expect(200))

    it('returns a 401 if you try to migrate the DB without being authenticated', () =>
      request(server)
        .post('/v1/__internal__/db/migrate/latest')
        .expect(401))

    it('returns a 401 if you try to rollback the DB without being authenticated', () =>
      request(server)
        .post('/v1/__internal__/db/migrate/rollback')
        .expect(401))

    it('returns a 401 if you try to seed the DB without being authenticated', () =>
      request(server)
        .post('/v1/__internal__/db/seed')
        .expect(401))
  })
})
