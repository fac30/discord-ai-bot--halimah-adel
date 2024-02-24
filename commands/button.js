const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Replies with a button!'),
		
	async execute(interaction) {
		const test = new ButtonBuilder()
			.setCustomId('test')
			.setLabel('Test')
			.setStyle(ButtonStyle.Danger);

		const deletes = new ButtonBuilder()
			.setCustomId('deletes')
			.setLabel('Delete')
			.setStyle(ButtonStyle.Secondary);

		const dm = new ButtonBuilder()
			.setCustomId('dm')
			.setLabel('Direct message')
			.setStyle(ButtonStyle.Success);

		const row = new ActionRowBuilder()
			.addComponents(test, deletes, dm);

		await interaction.reply({
			content: `Press a button.`,
			components: [row],
		});
	},
};