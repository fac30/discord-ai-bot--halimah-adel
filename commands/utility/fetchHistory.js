const client = require("../handlers/newClient");

async function fetchHistory (msg) {
    const conversation = [];
    console.log(conversation);
    
    const conversationHistory = await msg.channel.messages.fetch({ limit: 10 });
    conversationHistory.reverse();
    //console.log({conversationHistory});

    // console.log('conversationHistory:', await conversationHistory[0]);
    // console.log('Message Author ID:', message.author.id);
    // console.log('Client User ID:', message.client.user.id);
    // For each message fetched, it checks who sent it and pushes to the conversation array
    conversationHistory.forEach((message) => {
        if (message.author.bot && message.author.id !== client.user.id) {
            
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
    return conversation;
}

module.exports = fetchHistory;