/* eslint-disable no-mixed-spaces-and-tabs */
const { Client, Events, GatewayIntentBits, Partials, ButtonBuilder, MessageActionRow, MessageButton } = require('discord.js');
const { OpenAI } = require('openai');
require('dotenv/config');
const token = process.env.TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
    ],
});

const openai = new OpenAI({ apiKey: process.env.API_KEY });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready logged! Logged in as ${readyClient.user.tag}`);
});

client.on('messageCreate', async msg => {
    if (msg.author.bot || !msg.content) return;

    if (!msg.content.startsWith('!')) return;

    await msg.channel.sendTyping();

    //console.log(msg);

    const conversation = [];

    try {
        const conversationHistory = await msg.channel.messages.fetch({ limit: 10 });
        conversationHistory.reverse();

        conversationHistory.forEach((message) => {
            if (message.author.bot && message.author.id !== client.user.id) return;

            if (message.author.id === client.user.id) {
                conversation.push({
                    role: 'assistant',
                    content: message.content,
                });
                return;
            }

            conversation.push({
                role: 'user',
                content: message.content,
            });
        });
    }
    catch (error) {
        console.error('Conversation history error:', error);
        msg.reply('An error occurred while fetching message history. Please try again later.');
    }

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-1106',
            messages: conversation,
            max_tokens: 25,
        });

        const response = chatCompletion.choices[0].message.content;

        const row = new MessageActionRow()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('explain_more')
                    .setLabel('Explain More')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('delete_message')
                    .setLabel('Delete')
                    .setStyle('DANGER'),
                new MessageButton()
                    .setCustomId('send_direct_message')
                    .setLabel('Send DM')
                    .setStyle('SECONDARY')
                );

        await msg.reply({ content: response, components: [row] });

    }
    catch (error) {
        console.error('OpenAI Error:', error);
        msg.reply('An error occurred while processing your request. Please try again later.');
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isButton()) {
        const { customId } = interaction;

        // Handle different button clicks
        if (customId === 'explain_more') {
            // Implement the logic for explaining more
            await interaction.reply('Sure, here is more information.');
        } else if (customId === 'delete_message') {
            // Implement the logic for deleting the original message
            await interaction.message.delete();
        } else if (customId === 'send_direct_message') {
            // Implement the logic for sending a direct message
            await interaction.user.send('This is a direct message from the bot.');
        }
    }
});

client.login(token);
