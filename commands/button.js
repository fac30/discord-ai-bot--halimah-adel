const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Replies with a button!'),
		
	async execute(interaction) {
		//const target = interaction.options.getUser('target');
		//const reason = interaction.options.getString('reason') ?? 'No reason provided';

		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm Ban')
			.setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(cancel, confirm);

		await interaction.reply({
			content: `Are you sure you want to?`,
			components: [row],
		});
	},
};




	// await interaction.reply({
	// 	content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
	// 	components: [row],

	// const row = new MessageActionRow()
	// 	.addComponents(
	// 		new MessageButton()
	// 			.setCustomId('primary')
	// 			.setLabel('Primary')
	// 			.setStyle('PRIMARY'),
			
	//         new MessageButton()
	// 			.setCustomId('secondary')
	// 			.setLabel('Secondary')
	// 			.setStyle('SECONDARY'),
	// 	);