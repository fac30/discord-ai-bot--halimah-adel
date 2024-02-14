const { Events } = require("discord.js");
const { OpenAI } = require('openai');
require('dotenv/config');

// Create an instance of OpenAI with the API key
const openai = new OpenAI({ apiKey: process.env.API_KEY });

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} was found.`
            );
            return;
        }

        
        try {  //-----  await command.execute(interaction) ----//
            console.log({interaction});
            // Ignore messages from bots and empty messages
            if (interaction.user.bot || !interaction.content) return;

            // Ignore message if it doesn't start with !
            if (!interaction.content.startsWith('!')) return;

            // Test chat connection
            if (interaction.content === '!hello') {
                await interaction.reply('Hey!');
            }

            // Show the bot typing as we wait for a response
            await interaction.deferReply();

            // Empty array to contain the whole conversation, so the bot can refer back
            const conversation = [];

            // Fetch last 10 messages from the channel
            try {
                const conversationHistory = await interaction.channel.messages.fetch({ limit: 10 });
                conversationHistory.reverse();

                // For each message fetched, check who sent it and push to the conversation array
                conversationHistory.forEach((message) => {
                    if (message.author.bot && message.author.id !== interaction.client.user.id) return;

                    // If the author is our bot
                    if (message.author.id === interaction.client.user.id) {
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
            } catch (error) {
                console.error('Conversation history error:', error);
                await interaction.followUp('An error occurred while fetching message history. Please try again later.');
                return;
            }

            // Connect to OpenAI with Error Handling
            try {
                const chatCompletion = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo-1106',
                    messages: conversation,
                    max_tokens: 25,
                });

                const response = chatCompletion.choices[0].message.content;

                if (interaction.content.startsWith('!private')) {
                    // Direct message the user
                    try {
                        const user = await interaction.user.fetch();
                        console.log(`userName: ${user.tag}`);
                        await user.send(`In response to your message: "${interaction.content}", the AI says: "${response}"`);
                    } catch (error) {
                        console.error('Error fetching user or sending a direct message:', error);
                    }
                } else {
                    await interaction.followUp(response);
                }
            } catch (error) {
                console.error('OpenAI Error:', error);
                await interaction.followUp('An error occurred while processing your request. Please try again later.');
            }
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};





// module.exports = {
//     name: Events.InteractionCreate,
//     async execute(interaction) {
//         if (!interaction.isChatInputCommand()) return;
 
//         const command = interaction.client.commands.get(interaction.commandName);
 
//         if (!command) {
//             console.error(
//                 `No command matching ${interaction.commandName} was found.`
//             );
//             return;
//         }
 
//         try {
//             await command.execute(interaction);
//         } catch (error) {
//             console.error(error);
//             if (interaction.replied || interaction.deferred) {
//                 await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
//             } else {
//                 await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//             }
//         }
//     },
// };