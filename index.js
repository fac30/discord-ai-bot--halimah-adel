/* eslint-disable no-mixed-spaces-and-tabs */
// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const client = require('./handlers/newClient.js');
const { Client, Events, GatewayIntentBits, Partials, MessageActionRow, MessageButton } = require('discord.js');
const { OpenAI } = require('openai');
require('dotenv/config');
const token = process.env.TOKEN;

// Create a new client instance
// const client = new Client({
// 	intents: [
// 		GatewayIntentBits.Guilds,
// 		GatewayIntentBits.GuildMembers,
// 		GatewayIntentBits.GuildMessages,
// 		GatewayIntentBits.MessageContent,
// 		GatewayIntentBits.DirectMessages,
// 	],
// 	partials: [
// 		Partials.Channel,
// 		Partials.Message,
// 	],
// });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready logged! Logged in as ${readyClient.user.tag}`);

	
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
	
	//console.log(msg);

	// Empty array to contain whole conversation, so bot can refer back
	const conversation = [];

	// Fetches last 10 messages from the channel
	try {
		const conversationHistory = await msg.channel.messages.fetch({ limit: 10 });
		conversationHistory.reverse();
		// console.log("Client:", client);
		
		// For each message fetched, it checks who sent it and pushes to the conversation array
		conversationHistory.forEach((message) => {
			if (message.author.bot && message.author.id !== client.user.id) return;
			//console.log("Client:", client.user);

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
				//console.log(`userName: ${user}`);
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


// load the events files on startup
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// load the command files on startup
// client.commands = new Collection();
// const commandsPath = path.join(__dirname, "commands");
// const commandFiles = fs
//     .readdirSync(commandsPath)
//     .filter((file) => file.endsWith(".js"));

// for (const file of commandFiles) {
//     const filePath = path.join(commandsPath, file);
//     const command = require(filePath);
//     if("data" in command && "execute" in command) {
//         client.commands.set(command.data.name, command); 
//     } else {
//         console.log(
//             `[WARNING] The command at ${filePath} is missing a required "data" or "execute property"`
//         );
//     }
// }

// Log in to Discord with your client's token
client.login(token);
