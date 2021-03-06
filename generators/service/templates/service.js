// Initializes the `<%= name %>` service on path `/<%= path %>`
const createService = require('<%= serviceModule %>')<% if(modelName) { %>
const createModel = require('../../models/<%= modelName %>')<% } %>
const hooks = require('./<%= kebabName %>.hooks')
const settings = require('standard-settings').getSettings()

module.exports = function (app) {
  <% if (modelName) { %>const Model = createModel(app)<% } %>
  const paginate = settings.paginate

  const options = {
    name: '<%= kebabName %>',<% if (modelName) { %>
    Model,<% } %>
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/<%= path %>', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('<%= path %>')

  service.hooks(hooks)
}
