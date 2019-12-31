const pino = require('pino')

const log = pino({
  name: process.env.NAME || '__STARTER__',
  level: process.env.LOG_LEVEL || 'trace',
  serializers: pino.stdSerializers,
  redact: {
    paths: ['password', 'user.password']
  },
  prettyPrint: true
})

module.exports = log
