// Declare all variables needed for the bot to work
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { OpenAI } = require('openai');
require ('dotenv/config');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent,
	],
});

// Initialise slash commands
client.commands = new Collection();

// Retrieve command files using node:fs and node:path
const foldersPath = path.join(__dirname, 'commands');
// Reads path to the directory foldersPath and returns all folders inside, in this case `utility`
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	// Reads path to the directory and returns an array of all of the JavaScript file names
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		// Set command into the client.commands Collection
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
		}
	}
}

// Only once, log when the bot is online
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Create a new OpenAI instance
const openai = new OpenAI({
	apiKey: process.env.API_KEY,
});

// Event listener for incoming messages
client.on('messageCreate', async (message) => {
	// Ignore message if the author is a bot
	if (message.author.bot) return;
	// Ignore message if it doesn't start with /ask
	if (!message.content.startsWith('/ask')) return;

	// Show the bot typing as we wait for a response
	await message.channel.sendTyping();

	// Empty array to contain whole conversation, so bot can refer back
	const conversation = [];

	// Initialises the bot's role as an assistant
	conversation.push({
		role: 'system',
		content: 'You are a helpful assistant.',
	});

	// Fetches last 10 messages from the channel
	const conversationHistory = await message.channel.messages
		.fetch({ limit: 10 });
	conversationHistory.reverse();

	// For each message fetched, it checks who sent it and pushes to the conversation array
	conversationHistory.forEach((msg) => {
		if (msg.author.bot && msg.author.id !== client.user.id) return;

		if (msg.author.id === client.user.id) {
			conversation.push({
				role: 'assistant',
				content: msg.content,
			});

			return;
		}

		conversation.push({
			role: 'user',
			content: msg.content,
		});
	});

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		// Refers back to conversation array so it knows the full conversation
		messages: conversation,
	})
		.catch((error) => console.error(error));

	if (!response) {
		message.reply('Sorry, I\'m having trouble right now. Please try again later.');
	}

	message.reply(response.choices[0].message.content);
});

// Log in to Discord as the bot
client.login(process.env.TOKEN);