/* ---- 
        1. When you run the 'npm run test' in the terminal, temporary change the testable file name into test.js, 
            as package.json test set up on test.js file. 
        2. After successful test completion, re-name file to test.{ the function that you test }.js
---- */

// import tester liabaries
const assert = require('assert');
const test = require('node:test');
// import the neccessery discord classes and files 
const { Client } = require('discord.js');
const client = require("../handlers/newClient");
require('dotenv/config');
const token = process.env.TOKEN;


// Test Discord Client Initialization
test('Create client object', () => {
    assert.strictEqual(typeof client, 'object', 'Client should be an object');
    assert.strictEqual(client instanceof Client, true, 'Client should be an instance of Discord.js Client');
});




