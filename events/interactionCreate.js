const { Events } = require("discord.js");
// const { OpenAI } = require('openai');
// require('dotenv/config');
const client = require("../handlers/newClient");
// const fetchHistory = require("../handlers/fetchHistory")
const executeButtons = require("../handlers/executeButtons")

// Use API Key Directly
// const openai = new OpenAI({ apiKey: process.env.API_KEY });



module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()){
            // console.log("interaction:", interaction);
 
            const command = interaction.client.commands.get(interaction.commandName);
    
            if (!command) {
                console.error(
                    `No command matching ${interaction.commandName} was found.`
                );
                return;
            }
    
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: `There was an  error while executing the ${interaction.commandName} command!`, 
                    ephemeral: true });
                } else {
                    await interaction.reply({ content: `There was an  error while executing the ${interaction.commandName} command!`,
                    ephemeral: true });
                }
            }
            
        // Handel Buttons interaction
        } else if (interaction.isButton()) {
            executeButtons(interaction);
        } 
        // else if (interaction.isStringSelectMenu()) {
		// 	const selectedValue = interaction.values[0];
        //     await interaction.reply(`You selected: ${selectedValue}`);
		// }
    }
 };

