var assign = require('object-assign')

var BaseSync = require('./base-sync')

var DEFAULT_OPTIONS = {
  timeout: 20000,
  ping: 10000
}

/**
 * Server node in synchronization pair.
 *
 * Instead of client node, it doesn’t initialize synchronization
 * and destroy itself on disconnect.
 *
 * @param {string} host Unique current host name.
 * @param {Log} log Logux log instance to sync with other node log.
 * @param {Connection} connection Connection to other node.
 * @param {object} [options] Synchronization options.
 * @param {object} [options.credentials] This node credentials.
 *                                       For example, access token.
 * @param {authCallback} [options.auth] Function to check
 *                                      other node credentials.
 * @param {number} [options.timeout=20000] Timeout in milliseconds
 *                                         to disconnect connection.
 * @param {number} [options.ping=10000] Milliseconds since last message to test
 *                                      connection by sending ping.
 * @param {filter} [options.inFilter] Function to filter events
 *                                    from other client. Best place
 *                                    for access control.
 * @param {mapper} [options.inMap] Map function to change event
 *                                 before put it to current log.
 * @param {filter} [options.outFilter] Filter function to select events
 *                                     to synchronization.
 * @param {mapper} [options.outMap] Map function to change event
 *                                  before sending it to other client.
 * @param {number[]} [options.subprotocol] Application subprotocol version.
 * @param {number[]} [options.supports] What major versions of application
 *                                      subprotocol are supported.
 *
 * @example
 * import { ServerSync } from 'logux-sync'
 * startServer(ws => {
 *   const connection = new ServerConnection(ws)
 *   const sync = new ServerSync('server' + id, log, connection)
 * })
 *
 * @extends BaseSync
 * @class
 */
function ServerSync (host, log, connection, options) {
  options = assign({ }, DEFAULT_OPTIONS, options)
  BaseSync.call(this, host, log, connection, options)
  if (this.options.fixTime) {
    throw new Error(
      'Server could not fix time. Set opts.fixTime for Client node.')
  }
  if (options && (options.synced || options.otherSynced)) {
    throw new Error(
      'Server could not use synced and otherSynced options.')
  }
}

ServerSync.prototype = {

  onConnect: function onConnect () {
    BaseSync.prototype.onConnect.call(this)
    this.startTimeout()
  },

  onDisconnect: function onDisconnect () {
    BaseSync.prototype.onDisconnect.call(this)
    this.destroy()
  },

  connectMessage: function connectMessage () {
    BaseSync.prototype.connectMessage.apply(this, arguments)
    this.endTimeout()
  }

}

ServerSync.prototype = assign({ }, BaseSync.prototype, ServerSync.prototype)

module.exports = ServerSync
