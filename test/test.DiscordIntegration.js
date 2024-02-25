const { Events, Client, GatewayIntentBits, Partials } = require('discord.js');
const client = require("../handlers/newClient")
require('dotenv/config');
const assert = require('assert');

const token = process.env.TOKEN;




// Test client login
client.login(token)
    .then(() => {
        console.log(`Client logged in successfully.`);
    })
    .catch((error) => {
        console.error('Client login failed:', error);
    });


// Test ClientReady event
client.once('ready', () => {
    console.log(`Client ready. Logged in as ${client.user.tag} on CLIENT_ID of ${client.user.id}`);
    assert.strictEqual(client.user.tag, 'YOUR_BOT_TAG');
    client.destroy();
});


// Handle errors during login
client.on('error', (error) => {
    console.error('Client error:', error);
});


// Handle unexpected disconnection
client.once('disconnect', (event) => {
    console.error('Client disconnected:', event);
    process.exit(1);
});
