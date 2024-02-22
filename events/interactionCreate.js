const { Events } = require("discord.js");
require('dotenv/config');
const client = require("../handlers/newClient");
//const fetchHistory = require("../commands/utility/fetchHistory")

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isButton()) {
            // console.log(interaction.message.channel);
            // if (interaction.customId==='explain_more'){
            //     const conversation = await fetchHistory(interaction.message);
            //     conversation.push({
            //         role: 'user',
            //         content: "Explain more."
            //     });
            //     // TODO open ai request
            //     //const conversation = await fetchHistory(msg);
            //     const chatCompletion = await openai.chat.completions.create({
            //         model: 'gpt-3.5-turbo-1106',
            //         messages: conversation,
            //         max_tokens: 25,
            //     });
            //     const response = chatCompletion.choices[0].message.content;
            //     // console.log('OpenAI Response:', response);
            //     interaction.message.reply({content: `Explain more.`});
            // } 
        } else if (interaction.isChatInputCommand()){
 
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
        }
    }
 };