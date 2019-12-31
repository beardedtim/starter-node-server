const { Router } = require('express')
const path = require('path')
const { Model } = require('objection')

// We have some fancy loaders and readers that we wrote
// in order to make the folder structure work how we wanted
//
// These are more so the framework works, not really any
// specific business logic
const createAPI = require('./lib/createRouteFromFolder')
const applyAPI = require('./lib/applyAPIRoute')
const requireDirectory = require('./lib/requireDirectory')

/**
 * CONTEXT
 *
 * These are the things that we will be adding to
 * the context when we create the server. These are
 * shared resources, backing services, etc that any
 * and all middleware/routes/Server Stuff should be
 * able to access.
 */
const db = require('./db')
const log = require('./log')
const models = requireDirectory(path.resolve(__dirname, 'models'))
const errors = requireDirectory(path.resolve(__dirname, 'errors'))
const helpers = requireDirectory(path.resolve(__dirname, 'helpers'))

// How we create a server with some sane defaults setup
const createServer = require('./server')

/**
 * RESTful API
 *
 * This creates an API based on the folder structure and
 * file names.
 *
 * If you have api/v1/users/get.js
 *
 * API will have a hander that will listen for GET /v1/users
 */
const API = createAPI({
  apiPrefix: process.env.API_PREFIX || '/',
  API: Router(),
  dirPath: path.resolve(__dirname, process.env.API_DIRECTORY)
})

// We have to apply the DB to the Model class so that
// all the models we created will have access to the
// DB
//
// https://vincit.github.io/objection.js/guide/getting-started.html
Model.knex(db)

module.exports = () => {
  // We create the server based on our context above
  const server = createServer({
    db,
    log,
    models,
    errors,
    helpers
  })

  // Apply the API we built above
  server.use(applyAPI(API))

  // And we catch any errors thrown
  // in the middleware so we can log
  // and munge it into the correct shape
  server.use(errors.middleware)

  return server
}
