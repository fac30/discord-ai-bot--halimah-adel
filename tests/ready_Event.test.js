// import tester liabaries
const assert = require('assert')
const test = require('node:test')
// import the neccessery files, discord classes
const { execute, once } = require('../events/ready') // ---> This is to the 3. Test version
const readyFunction = require('../events/ready')
const client = require('../handlers/newClient')
require('dotenv/config')
const clientId = process.env.CLIENT_ID
const token = process.env.TOKEN

// 1. Test client login
test('Test client login with the token', async () => {
  try {
    await client.login(token)
    assert.ok(client.user, 'Client should have a user after login')
    assert.strictEqual(client.user.bot, true, 'Client user should be a bot')
  } catch (error) {
    // If login fails, the error will be caught here
    assert.fail(`Client login failed: ${error.message}`)
  }
})

/*
    1. Test that my bot initalises,
    2. Test that my bot log in discord successfully --> Bot online
*/
// 2. Test ClientReady
test('Test ClientReady event', () => {
  const BotName = client.user.tag /* --- 'Hadel Bot#3409' --- */
  const BotId = client.user.id /* --- CLIENT_ID -> It's the bot itself. --- */

  assert.strictEqual(BotName, 'Hadel Bot#3409', 'BotName should match expected value')
  assert.strictEqual(BotId, clientId, 'BotId should match clientId')
  assert.ok(client.guilds.cache.size > 0, 'The bot should be in at least one guild')

  // Destroy the client after the tests
  client.destroy()
})

// 3. Test ClientReady is a function and only executed once
test('Test ClientReady is a function and only executed once', () => {
  assert.strictEqual(typeof execute, 'function', 'ClientReady should be a function')
  assert.ok(once, 'ClientReady should be executed only once')
})

/* 4. Test that ClientReady = readyFunction is executed only once
        Set up variable for the first execution, then another varible for try to execute again the readyFunction.once
        Then compare the two variable, which both should be boolean ---> true
*/
const originalOnceValue = readyFunction.once // --> 'boolean'

test('Test readyFunction = ClientReady, is executed only once', () => {
  assert.strictEqual(typeof readyFunction.execute, 'function', 'readyFunction should be a function')
  assert.ok(originalOnceValue, 'readyFunction.once should be true')

  // Simulate the execution on readyFunction
  readyFunction.execute(client)

  // Check if ClientReady.once = readyFunction.once is still true after execution
  const flippedOnceValue = readyFunction.once
  assert.strictEqual(flippedOnceValue, originalOnceValue, 'readyFunction.once should not be flipped after execution')
})
