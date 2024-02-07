// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, GuildMember } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;

// Create a new client instance
const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds, 
		//GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.MessageContent
	] 
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready logged logged! Logged in as ${readyClient.user.tag}`);
});

// Event listener for incoming messages
client.on('messageCreate', msg => {
	console.log('whatever');
	console.log(`Received message: ${msg.content}`);
	if (msg.content === '!hello') {
	  msg.reply('Hey!');
	}
	// Ignore messages from bots
	if (message.author.bot) return;
  });


// Log in to Discord with your client's token
client.login(token);

//console.log('Bot is starting...');