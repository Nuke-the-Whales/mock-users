const fs = require('fs')
const storeName = 'store'

let store = read()

function read () {
  if (!fs.existsSync(storeName)) return { users: {} }
  return JSON.parse(fs.readFileSync(storeName))
}

function write () {
  fs.writeFileSync(storeName, JSON.stringify(store, null, 2))
  return store
}

function addUser (id) {
  if (!store.users[id]) store.users[id] = { subscriptions: {} };

  return write()[id]
}

function addSubscription (id, subId, subName) {
  if (!store.users[id]) addUser(id)
  store.users[id].subscriptions[subId] = subName

  return write()[id]
}

function removeSubscription (id, subId) {
  if (!store.users[id]) return null
  delete store.users[id].subscriptions[subId]

  return write()[id]
}

function getUserSubscriptions (id) {
  return store.users[id].subscriptions
}

module.exports = {
  addUser,
  addSubscription,
  removeSubscription,
  getUserSubscriptions
}
