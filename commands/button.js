const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Replies with a button!'),
		
	async execute(interaction) {
		const deletes = new ButtonBuilder()
			.setCustomId('deletes')
			.setLabel('Delete')
			.setStyle(ButtonStyle.Danger);

		const button = new ButtonBuilder()
			.setCustomId('button')
			.setLabel('Button')
			.setStyle(ButtonStyle.Secondary);

		const gratulation = new ButtonBuilder()
			.setCustomId('gratulation')
			.setLabel('Gratulation')
			.setStyle(ButtonStyle.Success);

		const row = new ActionRowBuilder()
			.addComponents(deletes, button, gratulation);

		await interaction.reply({
			content: `Selection of buttons.`,
			components: [row],
		});
	},
};