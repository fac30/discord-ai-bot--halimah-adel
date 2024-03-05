// import tester liabaries
const assert = require('assert');
const test = require('node:test');
// import the neccessery files 
const client = require("../handlers/newClient");
const pingCommand = require("../commands/ping");
const interactionCreate = require("../events/interactionCreate");

// Register the ping command
client.commands = new Map();
client.commands.set(pingCommand.data.name, pingCommand);

// Simulate interaction creation
test('Test ping command execution', async () => {
    // Simulate a slash command interaction
    const TestInteraction = {
        isChatInputCommand: () => true,
        client: client,
        commandName: pingCommand.data.name,
        reply: async (response) => {
            try{
                assert.ok(pingCommand, 'Ping command should be called.');
                assert.strictEqual(response, 'pong! Hello!', 'Response should be the expected value.');
            } catch (error) {
                assert.fail(`TestInteraction failed: ${error.message}`);
            }
        },
    };

    // Execute the interaction
    await interactionCreate.execute(TestInteraction);
    
    // Clean up resources
    client.destroy();
});
