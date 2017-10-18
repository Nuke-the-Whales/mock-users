const fs = require('fs')
const storeName = 'store'

let store = read()

function read () {
  if (!fs.existsSync(storeName)) return {}
  return JSON.parse(fs.readFileSync(storeName))
}

function write () {
  fs.writeFileSync(storeName, JSON.stringify(store, null, 2))
  return store
}

function addUser (id) {
  store.users[id] ? store.users[id] = { subscriptions: {} } : store.users[id];

  return write()[id]
}

function addSubscription (id, subId) {
  if (!store.users[id]) return null
  store.users[id].subscriptions[subId] = Date.now()

  return write()[id]
}

function removeSubscription (id, subId) {
  if (!store.users[id]) return null
  delete store.users[id].subscriptions[subId]

  return write()[id]
}

module.exports = {
  addUser,
  addSubscription,
  removeSubscription
}
