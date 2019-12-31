const parseAPI = require('./parseAPI')

module.exports = ({ apiPrefix, API, dirPath = __dirname }) =>
  parseAPI(dirPath).then(routes => {
    const routeMap = {}

    for (const path of Object.keys(routes)) {
      const route_path = path.replace(dirPath, '')

      for (const [method, handler] of Object.entries(routes[path])) {
        // If they gave us an array, they have custom
        // middleware they want to run
        if (Array.isArray(handler)) {
          const actualHandler = handler.pop()
          const wrappedHandler = async (req, res, next) => {
            try {
              await actualHandler(req, res)
            } catch (e) {
              return next(e)
            }
          }

          API[method](route_path, ...handler, wrappedHandler)
        } else {
          const wrappedHandler = async (req, res, next) => {
            try {
              await handler(req, res, next)
            } catch (e) {
              return next(e)
            }
          }
          // They gave us just a function
          API[method](route_path, wrappedHandler)
        }

        const fullPath =
          apiPrefix[apiPrefix.length - 1] === '/'
            ? `${apiPrefix.slice(0, -1)}${route_path}`
            : `${apiPrefix}${route_path}`

        // If we've seen this path before
        routeMap[fullPath]
          ? // we this method
            (routeMap[fullPath][method] = true)
          : // else we need to create the object
            (routeMap[fullPath] = { [method]: true })
      }
    }

    // We have an endpoint to see
    // all of the available routes
    // and their methods
    API.use('/_available', (_, res) =>
      res.json({
        data: routeMap,
        meta: {
          description:
            'These are the avaialable routes for the API to take. If you do not see the route that you are looking for, you either do not have authorization to view it or it does not exist.'
        }
      })
    )

    return API
  })
