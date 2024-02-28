/* ----
    IMPORTANT !
    1. To run this test, type `npm run openai-test`.
    2. Import tester libraries in each test file
---- */

// import tester libraries
const assert = require('assert')
const test = require('node:test')

// import the necessary library and .env variables
const openApiRequest = require('../handlers/openApiRequest.js');
const messageCreate = require('../events/messageCreate.js');
require('dotenv/config')


// Test OpenAI Library Integration
test('Test bot is integrated with OpenAI and successfully creates an API request', async () => {
    
    try {
        const prompt = 'hello'


    }
  assert.strictEqual(typeof client, 'object', 'Client should be an object')
  assert.ok(client instanceof Client, true, 'Client should be an instance of discord.js Client')
})

await messageCreate.execute(prompt)

// Test inside that the fetch to OpenAI API works i.e. status 200 (works), status 400 (error)

/* ----
        Ensure that the OpenAI library is correctly integrated by creating a test function that attempts to use the OpenAI API to create a simple chat completion or query
---- */
