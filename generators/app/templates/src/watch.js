const logger = require('winston')
const invalidate = require('invalidate-module')
const { resolve } = require('path')
const chokidar = require('chokidar')
const settings = require('standard-settings').getSettings()

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise ', p, reason)
})

const src = (...args) => resolve(__dirname, ...args)

const getApplication = (() => {
  let app = null

  chokidar
    .watch([src()], {
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 50
      }
    })
    .unwatch(src('index.js'))
    .on('all', (evt, filename) => {
      if (filename.endsWith('.js')) {
        logger.info(`reloaded ${filename}`)
        invalidate(resolve(filename))
        app = null
      }
    })

  return () => {
    if (app === null) {
      app = require('./app')
    }
    return app
  }
})()

const handler = {
  get (target, name) {
    return target()[name]
  },
  set (target, name, value) {
    target()[name] = value
  },
  apply (target, that, args) {
    return target().apply(that, args)
  }
}

const proxy = new Proxy(getApplication, handler)

const hostname = settings.server.host
const port = settings.server.port
const server = proxy.listen(port)

server.on('listening', () => {
  logger.info('Feathers application started on http://%s:%d', hostname, port)
})
