const mongoose = require('mongoose')
const settings = require('standard-settings').getSettings()

module.exports = function (app) {
  const config = settings.mongodb
  mongoose.connect(config, {})
  mongoose.Promise = global.Promise

  app.set('mongooseClient', mongoose)
}
