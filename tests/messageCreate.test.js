/* ----
    IMPORTANT !
    1. To run this test, type `npm run XYZ`.
    2. Import tester libraries in each test file
---- */

// import tester libraries
const assert = require('assert')
const test = require('node:test')

// import the necessary library and .env variables
const { Events } = require('discord.js')
const client = require('../handlers/newClient.js')
const messageCreate = require('../events/messageCreate.js')
require('dotenv/config')

// Test Bot receives and responds to "hello message"
test("Test bot's message event listener functionality", async () => {
  // Test reply
  const TestResponse = 'Hey!'

  // Initialise test message to send to the bot
  const TestMessage = {
    guildId: process.env.GUILD_ID,
    content: 'hello',
    author: {
      bot: false
    },
    reply: async (response) => {
      try {
        assert.ok(response, 'Bot should respond to message')
        assert.strictEqual(response, TestResponse, 'Response to "hello" should be "Hey!"')
      } catch (error) {
        assert.fail(`TestMessage failed: ${error.message}`)
      }
    }
  }

  // Simulate message to bot
  await messageCreate.execute(TestMessage)

  // Clean up after test complete
  client.destroy()
})


// const testClientID = { 
//     user: {
//         fetch : (id) => ({id})
//     };
// };

// Test bot doesn't respond to itself
// test("Test user id doesn't equal bot id", () => {

// })

/* ----
        Simulate receiving a message and verify that my bot responds with a “hello” message, testing the message event listener’s functionality
--- */
