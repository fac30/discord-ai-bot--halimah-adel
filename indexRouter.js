/* eslint-disable no-mixed-spaces-and-tabs */
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
const { OpenAI } = require('openai');
require('dotenv/config');
const fs = require('fs');

const token = process.env.TOKEN;

// Create a new client instance
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



client.commands = new Collection();

//command handler
//retrieves the command files in an array
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}


// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready logged! Logged in as ${readyClient.user.tag}`);

    command(client, 'createtextchannel', (message) => {
		const name = message.content.replace('!createtextchannel ', '')

		message.guild.channels
			.create(name, {
				type: 'text',
			})
			.then((channel) => {
				console.log(channel)
			})
	})
});

// Use API Key Directly
const openai = new OpenAI({ apiKey: process.env.API_KEY });

// Event listener for incoming messages
client.on('messageCreate', async msg => {
	// console.log({msg});

	// Ignore messages from bots and empty messages
	if (msg.author.bot || !msg.content) return;

	// Ignore message if it doesn't start with !
	if (!msg.content.startsWith('!')) return;

	// Test chat connection
	if (msg.content === '!hello') {
		msg.reply('Hey!');
	}

	// Show the bot typing as we wait for a response
	await msg.channel.sendTyping();

	console.log(msg);

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
});

// Event listener for interactions
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton() && interaction.componentType !== 'SELECT_MENU') return;

    if (interaction.isButton() && interaction.customId === 'primaryButton') {
        await interaction.reply('Primary button clicked!');
    } else if (interaction.componentType === 'SELECT_MENU' && interaction.customId === 'selectMenu') {
        await interaction.reply(`Selected option: ${interaction.values.join(', ')}`);
    }
});

// Log in to Discord with your client's token
client.login(token);
