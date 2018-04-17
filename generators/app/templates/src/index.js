/* eslint-disable no-console */
const logger = require('winston')
const app = require('./app')
const settings = require('standard-settings').getSettings()
const port = settings.server.port
const server = app.listen(port)

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', settings.server.host, port)
)
