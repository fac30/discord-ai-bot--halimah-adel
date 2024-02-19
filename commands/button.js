const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Replies with a button!'),
		
	async execute(interaction) {
		const explain = new ButtonBuilder()
			.setCustomId('explain_more')
			.setLabel('Explain more')
			.setStyle(ButtonStyle.Danger);

		const deletes = new ButtonBuilder()
			.setCustomId('deletes')
			.setLabel('Delete')
			.setStyle(ButtonStyle.Secondary);

		const dm = new ButtonBuilder()
			.setCustomId('dm')
			.setLabel('Direct message')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(explain, deletes, dm);

		await interaction.reply({
			content: `Are you sure you want to?`,
			components: [row],
		});
	},
};