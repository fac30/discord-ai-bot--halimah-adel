const { SlashCommandBuilder, ActionRowBuilder, UserSelectMenuBuilder, RoleSelectMenuBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('select_user')
		.setDescription('Menu to select roles and users.'),
	async execute(interaction) {
		try{
		console.log('Command started');

		const roleSelect = new RoleSelectMenuBuilder()
			.setCustomId('roles')
			.setPlaceholder('Select multiple roles.')
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
		
		console.log('Component added');
		await interaction.reply({
			content: 'Select roles and users:',
			components: [row1, row2],
		});
	} catch (error){
		console.error('Error during select_user command:', error);
	}
	},
};