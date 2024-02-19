const { Events } = require('discord.js');
const { OpenAI } = require('openai');
require('dotenv/config');

module.exports = {
    openApiCall,
};

const openApiCall = async (msg) => {
    // Show the bot typing as we wait for a response
    await msg.channel.sendTyping();

    // Empty array to contain whole conversation, so bot can refer back
    const conversation = [];

    // Fetches last 10 messages from the channel
    try {
        const conversationHistory = await msg.channel.messages.fetch({ limit: 10 });
        conversationHistory.reverse();

        // For each message fetched, it checks who sent it and pushes to the conversation array
        conversationHistory.forEach((message) => {
            if (message.author.bot && message.author.id !== client.user.id) return;

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

 export { openApiCall }
// export default openApiCall;