const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const client = require('../handlers/newClient')
const openApiRequest = require('../handlers/openApiRequest')

module.exports = {
  name: Events.MessageCreate,
  async execute (msg) {
    console.log({ msg })
    // Ignore messages from bots and empty messages
    if (msg.author.bot || !msg.content) return

    // Test chat connection
    if (msg.content === 'hello') {
      msg.reply('Hey!')
    }

    // Ignore message if it doesn't start with !
    if (!msg.content.startsWith('!')) return

    // Connect to OpenAI with Error Handling to recieve respond for prompt
    try {
      // import openAIRequest with fetchHistory of last 10 messages
      const { response } = await openApiRequest(msg)

      // Direct message the openAI respond to the user with the user prompt which will be removed
      if (msg.content.startsWith('!private')) {
        try {
          const user = await client.users.fetch(msg.author.id)

          user.send(`In response to your message: "${msg.content}", the AI says: "${response}"`)

          // Delete the original message
          await msg.delete()
          await msg.reply('Your private message has been processed.')
        } catch (error) {
          console.error('Error during "!private" Direct Message, bc fetching user or dm or confirm dm.', error)
        }
      }
      // Add Buttons to openAI respond in every prompt
      else {
        const explain = new ButtonBuilder()
          .setCustomId('explain_more')
          .setLabel('Explain more')
          .setStyle(ButtonStyle.Primary)

        const direct = new ButtonBuilder()
          .setCustomId('direct_message')
          .setLabel('Direct Message')
          .setStyle(ButtonStyle.Success)

        const google = new ButtonBuilder()
          .setLabel('Google')
          .setURL('https://www.google.com')
          .setStyle(ButtonStyle.Link)

        const row = new ActionRowBuilder()
          .addComponents(explain, direct, google)

        msg.reply({
          content: response,
          components: [row]
        })
      }
    } catch (error) {
      console.error('Error during openAI Bot response', error)
      msg.reply('An error occurred while processing your request. Please try again later.')
    }
  }
}
