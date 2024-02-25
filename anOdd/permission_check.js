const { Events } = require('discord.js');
const { PermissionsBitField } = require('discord.js');
const client = require("../handlers/newClient");
require("dotenv").config();
const token = process.env.TOKEN;

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready logged! Logged in as ${readyClient.user.tag}`);	
});


// Assuming 'guild' is the Guild instance you want to check
const GUILD_ID = '1204169818446635048';
const guild = client.guilds.cache.get(GUILD_ID);

if (!guild) {
    console.error(`Guild with ID ${GUILD_ID} not found.`);
    process.exit(1); // Exit the script if the guild is not found
}

// Assuming 'guild' is the Guild instance you want to check
const botMember = guild.members.cache.get(client.user.id); // 'client' is your Discord.js client instance

// Replace 'YOUR_PERMISSION' with the actual permission you want to check
const hasPermission = botMember.permissions.has(PermissionsBitField.FLAGS.MANAGE_CHANNELS);

console.log(`Does the bot have the permission? ${hasPermission}`);

client.login(token);
