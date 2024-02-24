const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Respond'),
    async execute(interaction) {
        console.log("interaction");
        await interaction.reply('Ask and I shall answer!')
    },
};

