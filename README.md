# Node Starter Server

> Stop Writing This

## Overview

A basic starting point for a Node server. This repo holds all that you need to start
building out a RESTful API.

### Features

- [x] ORM for SQL DB
- [x] DB Migrations
- [x] Custom Errors
- [x] Logging
- [x] API Versioning
- [x] Code Formatting
- [x] Static Files
- [x] Tests
  - _some, not alot, but some_
- [x] JWT Authentication

### Tools Used

_**Production Dependencies/Tools**_

- [Objection](https://vincit.github.io/objection.js/)
- [Knex](https://knexjs.org/)
- [Express](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [Postgres](https://www.postgresql.org/)

_**Development**_

- [Jest](https://jestjs.io/)
- [Nodemon](https://nodemon.io/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Docker Compose](https://docs.docker.com/compose/)

### Scripts

- `yarn dev:services:up`: Starts the backing services locally via Docker
- `yarn dev:services:down`: Drops the backing services locally via Docker
- `yarn dev`: Starts the Server locally
- `yarn test`: Runs the tests

### API Creation

The API is created by walking the folder `./api` and creating handlers
for all of the `<HTTP_METHOD>.js` files it finds, recursively building
out the path.

For example, if you had the following folder structure

```
/api
    |
    | v1
        |
        | users
              |
              | get.js
```

Your api would consist of a handler that is listening for requests of
`GET /v1/users`.

You can always find a list of available routes at `/_available`

### Requiring Folders

Inside of `createServer.js`, you will see that we are using a custom loader to
load in a directory of modules instead of having to manually create an `index.js`
inside of each directory and requiring/exporting them from there.

Most of these things are added to the `request context` for each `API` handler.
We do this so that 1) you can just add files where they go and the system will
know what to do and 2) we keep parity between the folder structure and the system,
similar to how the API works.

### Authentication

You can use your own schema/service for authentication or you can use the pre-built
handlers at `v1/users/authenticate`. It expects `POST` of a JSON body of `{ email, password }`
and will return a `meta` key with the JWT token.

#### How do I send the token?

The built in validation expects it `req.headers.authorization`, so as the Request Header
`Authorization` and we are expected a `Bearer` type token. Read more about this general idea
[here](https://www.securitydrops.com/bearer-tokens/).

### Authorization

Each handler is responsible for ensuring the request is authorized to be fulfilled.
We have created a helper inside of `helpers` called `ensureAuthorized`. It takes a
partial claim and request and returns if that request is authorized to make that claim.

It returns false for everything right now but should be a good starting point for implementing
your own authorization.
