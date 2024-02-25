const { Client, GatewayIntentBits, Partials, PermissionsBitField } = require('discord.js');
require('dotenv/config');
const token = process.env.TOKEN;

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		PermissionsBitField.Flags.Guilds,
		PermissionsBitField.Flags.GuildMembers,
		PermissionsBitField.Flags.ManageChannels,
		],
	partials: [
		Partials.Channel,
		Partials.Message,
	],
});


module.exports = client;