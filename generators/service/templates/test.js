const assert = require('assert')
const app = require('../../<%= libDirectory %>/app')

describe('\'<%= name %>\' service', () => {
  it('registered the service', () => {
    const service = app.service('<%= path %>')

    assert.ok(service, 'Registered the service')
  })
})
