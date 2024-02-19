const { Client, Events, GatewayIntentBits, Partials, MessageActionRow, MessageButton } = require('discord.js');
require('dotenv/config');
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

module.exports = client;