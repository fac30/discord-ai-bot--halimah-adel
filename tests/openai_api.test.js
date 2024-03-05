/* ----
    IMPORTANT !
    1. To run this test, type `npm run openai-test`.
    2. Import tester libraries in each test file
---- */

// import tester libraries
const assert = require('assert')
const test = require('node:test')

// import the necessary library and .env variables
const client = require('../handlers/newClient.js')
const openApiRequest = require('../handlers/openApiRequest.js')
require('dotenv/config')

// Test OpenAI Library Integration
test('Test bot is integrated with OpenAI and successfully creates an API request', async () => {
  const TestPrompt = {
    channelId: process.env.CHANNEL_ID,
    guildId: process.env.GUILD_ID,
    content: '!what is 2 + 2',
    author: {
      bot: false
    },
    reply: async (response) => {
      try {
        assert.ok(typeof response, 'string', 'Response is correctly returned as a string')
        console.info('Response is correctly returned as a string')
        assert.strictEqual(response, '2 + 2 equals 4.')
        console.info('Got correct response: 2 + 2 equals 4.')
      } catch (error) {
        assert.fail(`OpenAI Library Integration failed: ${error.message}`)
      }
    }
  }

  // Simulate message to bot for AI
  await openApiRequest(TestPrompt)

  // Clean up after test is complete
  client.destroy()
})

// Test inside that the fetch to OpenAI API works i.e. status 200 (works), status 400 (error)

/* ----
        Ensure that the OpenAI library is correctly integrated by creating a test function that attempts to use the OpenAI API to create a simple chat completion or query
---- */
