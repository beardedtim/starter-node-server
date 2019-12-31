const express = require('express')

const cors = require('cors')
const helmet = require('helmet')
const expressPino = require('express-pino-logger')
const cookies = require('cookie-parser')

const authentication = require('./middleware/authentication')
const addContext = require('./middleware/context')

const createServer = context => {
  const server = express()

  // Add context first so all other
  // middleware can use it
  server.use(addContext(context))

  // Then generic best practice middleware
  server.use(
    expressPino({
      logger: context.log
    })
  )

  server.use(cors())
  server.use(helmet())
  server.use(cookies())

  // Finally, our custom authentication middleware
  server.use(authentication())

  if (process.env.STATIC_FOLDER_DIRECTORY) {
    // Serve any static files that are asked of you
    server.use(
      express.static(process.env.STATIC_FOLDER_DIRECTORY, {
        extensions: ['html'],
        maxAge: 500
      })
    )
  }

  // Return a new server for someone else
  // to use
  return server
}

module.exports = createServer
