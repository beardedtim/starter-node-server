const log = require('./log')

const REQUIRED_KEYS = [
  'PORT',
  'NAME',
  'LOG_LEVEL',
  'JWT_SECRET',
  'DB_HOST',
  'DB_USER',
  'DB_PASS',
  'DB_NAME',
  'API_PREFIX',
  'API_DIRECTORY'
]

const missing_keys = []

for (const REQUIRED_KEY of REQUIRED_KEYS) {
  if (!(REQUIRED_KEY in process.env)) {
    missing_keys.push(REQUIRED_KEY)
  }
}

if (missing_keys.length) {
  throw new Error(
    `
You tried to start the service without the following key(s):
    
    ${missing_keys.join(', ')}
    
Please fix this by restarting the system with the correct amount of keys`
  )
}

const createServer = require('./createServer')

const server = createServer()
// We start listening on the specified port
const instance = server.listen(process.env.PORT, () => {
  // and tell anyone listening that we have started and where to find us
  log.info(`Service Started at port ${process.env.PORT}`)
})

process.on('uncaughtException', e => {
  log.fatal({ err: e })
  instance.close(() => process.exit(e.code || 1))
})

process.on('unhandledRejection', e => {
  log.fatal({ err: e })
  instance.close(() => process.exit(e.code || 1))
})
