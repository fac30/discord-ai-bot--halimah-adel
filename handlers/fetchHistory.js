const client = require("./newClient");

async function fetchHistory (msg) {
    const conversation = [];
    // console.log(conversation);
    
    try {
    const conversationHistory = await msg.channel.messages.fetch({ limit: 10 });
    conversationHistory.reverse();
  
    // For each message fetched, it checks who sent it and pushes to the conversation array
    conversationHistory.forEach((message) => {
        if (message.author.bot && message.author.id !== client.user.id) 

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
    catch (error){console.error('Conversation history error:', error);}
}

module.exports = fetchHistory;