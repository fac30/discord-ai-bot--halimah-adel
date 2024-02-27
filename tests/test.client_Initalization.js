/* ---- 
    IMPORTANT !
    1. When you run the 'npm run test' in the terminal, be sure that the testable file name included with the right path in the package.json at "scripts". 
        "scripts": {
            "test": "node ./tests/test.client_initalization.js",
        },
    2. Import tester liabaries in each test file
---- */

// import tester liabaries
const assert = require('assert');
const test = require('node:test');
// import the neccessery discord classes and files 
const { Client } = require('discord.js');
const client = require("../handlers/newClient");
require('dotenv/config');


// Test Discord Client Initialization
test('Create client object', () => {
    assert.strictEqual(typeof client, 'object', 'Client should be an object');
    assert.ok(client instanceof Client, true, 'Client should be an instance of discord.js Client');
});


/* ----  
        Test validated that the client of type is "object" 
        and is an instance of discord.js Client, respectively. 
---- */


