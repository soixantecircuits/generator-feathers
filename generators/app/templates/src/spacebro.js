var io = require('socket.io-client')
const SpacebroClient = require('spacebro-client').SpacebroClient
var standardSettings = require('standard-settings')
var settings = standardSettings.getSettings()

let address = settings.server.host
let port = settings.server.port
let parsedURI = require('url').parse(address)
let protocol = parsedURI.protocol ? '' : 'ws://'
let url = `${protocol}${address}:${port}`

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  let socket = io(url)
  // piggyback using the event-emitter bundled with socket.io client
  var patch = require('socketio-wildcard')(io.Manager)
  patch(socket)

  var spacebroClient = new SpacebroClient()

  socket.on('*', function (packet) {
    spacebroClient.emit.apply(spacebroClient, packet.data)
  })

  spacebroClient.on('connect', function () {
    spacebroClient.socket.on('*', ({ data }) => {
      let [eventName, args] = data
      // let args = data[1]
      if (args) {
        delete args._to
        delete args._from
        if (args._id && ['update', 'patch', 'remove'].some(el => eventName.includes(el))) {
          data = [eventName, args._id, args]
        }
      }
      // console.log('Received ' + eventName + ': ' + JSON.stringify(data))
      socket.emit.apply(socket, data)
    })
  })

  socket.on('connect', function (data) {
    // console.log('socket.io server connected')
  })
}
