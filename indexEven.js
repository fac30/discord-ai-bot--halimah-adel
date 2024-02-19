require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");

const token = process.env.TOKEN;

// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
	],
	partials: [
		Partials.Channel,
		Partials.Message,
	],
});

console.log(client);

//load the events files on startup
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

//load the command files on startup
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command); 
    } else {
        console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute property"`
        );
    }
}


client.login(token);

// console.log('client_1:', client);


module.exports = {client};

