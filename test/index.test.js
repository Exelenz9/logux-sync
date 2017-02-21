var BrowserConnection = require('../browser-connection')
var ServerConnection = require('../server-connection')
var ClientSync = require('../client-sync')
var ServerSync = require('../server-sync')
var LocalPair = require('../local-pair')
var SyncError = require('../sync-error')
var Reconnect = require('../reconnect')
var BaseSync = require('../base-sync')
var TestPair = require('../test-pair')
var sync = require('../')

it('has BrowserConnection class', function () {
  expect(sync.BrowserConnection).toBe(BrowserConnection)
})

it('has ServerConnection class', function () {
  expect(sync.ServerConnection).toBe(ServerConnection)
})

it('has ServerSync class', function () {
  expect(sync.ServerSync).toBe(ServerSync)
})

it('has ClientSync class', function () {
  expect(sync.ClientSync).toBe(ClientSync)
})

it('has LocalPair class', function () {
  expect(sync.LocalPair).toBe(LocalPair)
})

it('has SyncError class', function () {
  expect(sync.SyncError).toBe(SyncError)
})

it('has Reconnect class', function () {
  expect(sync.Reconnect).toBe(Reconnect)
})

it('has BaseSync class', function () {
  expect(sync.BaseSync).toBe(BaseSync)
})

it('has TestPair class', function () {
  expect(sync.TestPair).toBe(TestPair)
})
