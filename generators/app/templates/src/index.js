/* eslint-disable no-console */
const winston = require('winston')
const app = require('./app')
const settings = require('standard-settings').getSettings()
const port = settings.server.port
let server

if (settings.server.bindLocally) {
  const host = settings.server.host
  server = app.listen(port, host)
} else {
  server = app.listen(port)
}

const logger = winston.createLogger({
  level: settings.logger.level,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console()
  ]
})

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', settings.server.host, port)
)
