const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client){
        console.log(`Ready logged! Logged in as ${client.user.tag}`);
        console.log( `From log in: ${client.user.id}`);
    }, 
};

