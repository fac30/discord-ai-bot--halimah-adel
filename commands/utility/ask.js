const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask Hadel Bot a question!'),
    async execute(interaction) {
        await interaction.reply('Ask and I shall answer!')
    },
};