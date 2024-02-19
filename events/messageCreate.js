// import { openApiCall } from './handlers/openApiCall.js';
const { Events } = require('discord.js');
const { OpenAI } = require('openai');
const client = require('../indexEven.js');
// const { openApiCall } = require('./handlers/openApiCall.js');

console.log('client_2:', client);

// Use API Key Directly
const openai = new OpenAI({ apiKey: process.env.API_KEY });

module.exports = {
    name: Events.MessageCreate,
    async execute(msg) {
        //console.log({msg});
        
        // Ignore messages from bots and empty messages
        if (msg.author.bot || !msg.content) return;

        // Test chat connection
        if (msg.content === 'hello') {
            msg.reply('Hey!');
        }

        // Ignore message if it doesn't start with !
        if (!msg.content.startsWith('!')) return;

        // Make an OpenAPI call
        //await openApiCall(msg);
        await msg.channel.sendTyping();

        // Empty array to contain whole conversation, so bot can refer back
        const conversation = [];
    
        // Fetches last 10 messages from the channel
        try {
            const conversationHistory = await msg.channel.messages.fetch({ limit: 10 });
            //console.log({conversationHistory});
            
            // console.log('conversationHistory:', await conversationHistory[0]);
            // console.log('Message Author ID:', message.author.id);
            // console.log('Client User ID:', message.client.user.id);
            // For each message fetched, it checks who sent it and pushes to the conversation array
            conversationHistory.forEach((message) => {
                if (!message.author.bot && message.author.id !== client.user.id) {
                    
                    //console.log('SentMessage user ID:', message.author.id);
                    //console.log('ReturnedMessage user ID:', msg.client.user.id);
                    //console.log(message.client);
                    //console.log(client.user);
                    
                }
                // If the author is our bot
                if (message.author.id === client.user.id) {
                    conversation.push({
                        role: 'assistant',
                        content: message.content,
                    });
                    return;
                }
    
                // Otherwise, the author is a user
                conversation.push({
                    role: 'user',
                    content: message.content,
                });
                
            });
        }
        catch (error) {
            console.error('Conversation history error:', error);
            msg.reply('An error occured while fetching message history. Please try again later.');
        }
            
        // Connect to OpenAI with Error Handling
        try {
            const chatCompletion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo-1106',
                messages: conversation,
                max_tokens: 25,
            });
    
            const response = chatCompletion.choices[0].message.content;
            // Console log the chatCompletion respond
            // console.log('OpenAI Response:', response);
            // console.log(JSON.stringify(chatCompletion, null, 2));
    
            if (msg.content.startsWith('!private')) {
                // Direct message the user
                try {
                    const user = await client.users.fetch(msg.author.id);
                    console.log(`userName: ${user}`);
                    user.send(`In response to your message: "${msg.content}", the AI says: "${response}"`)
                        //.then(msg => console.log(`Sent message: ${msg.content} to ${user}`))
                        .catch(console.error);
                }
                catch (error) {
                    console.error('Error fetching user or sending direct message:', error);
                }
            }
            else {
                msg.reply(response);
            }
    
        }
        catch (error) {
            console.error('OpenAI Error:', error);
            msg.reply('An error occurred while processing your request. Please try again later.');
        }

        
    }
}




