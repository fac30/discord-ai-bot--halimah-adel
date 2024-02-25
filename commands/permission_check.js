const { PermissionsBitField } = require('discord.js');
const client = require("../handlers/newClient");
require('dotenv/config');

// Assuming 'guild' is the Guild instance you want to check
const GUILD_ID = '1204169818446635048'; // Replace with your actual guild ID
const guild = client.guilds.cache.get(GUILD_ID);

if (!guild) {
    console.error(`Guild with ID ${guildId} not found.`);
    process.exit(1); // Exit the script if the guild is not found
}

// Assuming 'guild' is the Guild instance you want to check
const botMember = guild.members.cache.get(client.user.id); // 'client' is your Discord.js client instance

// Replace 'YOUR_PERMISSION' with the actual permission you want to check
const hasPermission = botMember.permissions.has(PermissionsBitField.Flags.ManageChannels);

console.log(`Does the bot have the permission? ${hasPermission}`);