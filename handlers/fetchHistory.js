const client = require('./newClient')
require('dotenv/config')

async function fetchHistory (msg) {
  const conversation = []
  // console.log(conversation);

  try {
    console.log(msg.channel);
    const conversationChannel = await msg.channel.fetch(process.env.CHANNEL_ID)
    const conversationHistory = await conversationChannel.messages.fetch({ limit: 10 })
    conversationHistory.reverse()

    // For each message fetched, it checks who sent it and pushes to the conversation array
    conversationHistory.forEach((message) => {
      if (message.author.bot && message.author.id !== client.user.id)

      // If the author is our bot
      {
        if (message.author.id === client.user.id) {
          conversation.push({
            role: 'assistant',
            content: message.content
          })
          return
        }
      }

      // Otherwise, the author is a user
      conversation.push({
        role: 'user',
        content: message.content
      })
    })
    return conversation
  } catch (error) { console.error('Conversation history error:', error) }
}

module.exports = fetchHistory
