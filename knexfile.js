// Update with your config settings.

module.exports = {
  client: 'postgresql',
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: 'db/migrations'
  },
  seeds: {
    directory: 'db/seeds'
  }
}
