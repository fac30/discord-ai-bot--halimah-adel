import { openApiCall } from './handlers/openApiCall.js';
const { Events } = require('discord.js');
// const { openApiCall } = require('./handlers/openApiCall.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(msg) {
        console.log({msg});
        
        // Ignore messages from bots and empty messages
        if (msg.author.bot || !msg.content) return;

        // Test chat connection
        if (msg.content === 'hello') {
            msg.reply('Hey!');
        }

        // Ignore message if it doesn't start with !
        if (!msg.content.startsWith('!')) return;

        // Make an OpenAPI call
        await openApiCall(msg);
        
    }
}




