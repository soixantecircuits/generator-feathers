const path = require('path')
const favicon = require('serve-favicon')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')

const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
<% if (hasProvider('socketio')) { %>const socketio = require('@feathersjs/socketio')<% } %>
<% if (hasProvider('socketio')) { %>require('./spacebro')()<% } %>
<% if (hasProvider('primus')) { %>const primus = require('@feathersjs/primus')<% } %>
const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')
const channels = require('./channels')
const settings = require('standard-settings').getSettings()

const app = express(feathers())
const winston = require('winston')
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
// Load app configuration
app.configure(configuration())
// Enable CORS, security, compression, favicon and body parsing
app.use(cors())
app.use(helmet())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join(settings.folder.public, 'favicon.ico')))
// Host the public folder
app.use('/', express.static(settings.folder.public))

// Set up Plugins and providers
<% if (hasProvider('rest')) { %>app.configure(express.rest())<% } %>
<% if (hasProvider('socketio')) { %>app.configure(socketio())<% } %>
<% if(hasProvider('primus')) { %>app.configure(primus({ transformer: 'websockets' }))<% } %>
// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
// Set up our services (see `services/index.js`)
app.configure(services)
// Set up event channels (see channels.js)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
app.use(express.errorHandler({ logger }))

app.hooks(appHooks)

module.exports = app
