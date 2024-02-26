// import tester liabaries
const assert = require ('assert');
const test = require('node:test');
// import the neccessery files, discord classes 
const { Events } = require('discord.js');
// const readyFunction = require('../events/ready')
const client = require("../handlers/newClient")
require('dotenv/config');
const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;


// Test client login
test('Test client login with the token', async () => {
    try {
        await client.login(token);
        assert.ok(client.user, 'Client should have a user after login');
        assert.strictEqual(client.user.bot, true, 'Client user should be a bot');
    } catch (error) {
        // If login fails, the error will be caught here
        assert.fail(`Client login failed: ${error.message}`);
    }
});


/*
    1. Test that my bot initalises,
    2. Test that my bot log in discord successfully --> Bot online
*/
test('Test ClientReady event', () =>{
    const BotName = client.user.tag; /* --- 'Hadel Bot#3409' --- */
    const BotId = client.user.id;    /* --- CLIENT_ID -> It's the bot itself. --- */

    assert.strictEqual(BotName,  'Hadel Bot#3409', 'BotName should match expected value');
    assert.strictEqual(BotId,  clientId, 'BotId should match clientId');
    assert.ok(client.guilds.cache.size > 0, 'The bot should be in at least one guild');

    // Destroy the client after the tests
    client.destroy();
});




