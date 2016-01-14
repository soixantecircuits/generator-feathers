// jshint unused:false
import userService from './user';
<% if (database === 'mongodb') { %>import mongoose from 'mongoose';<% } %>
<% if (database === 'sqlite' || database === 'mssql' || database === 'postgres' || database === 'mysql' || database === 'mariadb') { %>import Sequelize from 'sequelize';<% } %>

export default function() {
  const app = this;
  <% if (database === 'sqlite') { %>
  const sequelize = new Sequelize('feathers', null, null, {
    dialect: 'sqlite',
    storage: app.get('sqlite'),
    logging: false
  });<% } else if (database === 'mssql') { %>
  const sequelize = new Sequelize('feathers', {
    dialect: '<%= database %>',
    host: 'localhost',
    port: 1433,
    logging: false,
    dialectOptions: {
      instanceName: 'feathers'
    }
  });<% } else if (database === 'postgres' || database === 'mysql' || database === 'mariadb') { %>
  const sequelize = new Sequelize(app.get('<%= database %>'), {
    dialect: '<%= database %>',
    logging: false
  });
  <% } else if (database === 'mongodb') { %>
  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;<% } %>
  <% if (database === 'sqlite' || database === 'mssql' || database === 'postgres' || database === 'mysql' || database === 'mariadb') { %>app.set('sequelize', sequelize);<% } %>

  app.configure(userService);
}
