const { SlashCommandBuilder, ActionRowBuilder, UserSelectMenuBuilder, RoleSelectMenuBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('select_user')
		.setDescription('Menu to select users.'),
	async execute(interaction) {
		const roleSelect = new RoleSelectMenuBuilder()
			.setCustomId('roles')
			.setPlaceholder('Select multiple role.')
			.setMinValues(1)
			.setMaxValues(10);

		const userSelect = new UserSelectMenuBuilder()
			.setCustomId('users')
			.setPlaceholder('Select multiple users.')
			.setMinValues(1)
			.setMaxValues(10);

			const row1 = new ActionRowBuilder()
			.addComponents(roleSelect);
		
		const row2 = new ActionRowBuilder()
			.addComponents(userSelect);
		
		await interaction.reply({
			content: 'Select role and users:',
			components: [row1, row2],
		});

		
	},
};