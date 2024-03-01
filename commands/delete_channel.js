const { SlashCommandBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName("delete_channel")
        .setDescription("Delete a custom discord channel")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels)
        .addChannelOption(option =>
            option.setName("channel")
            .setDescription("Select the channel you wanna delete.")
            .setRequired(true)
        ),

    async execute(interaction) {
        const { options} = interaction;

        const channel = options.getChannel("channel")

        await channel.delete()

        await interaction.reply({ content: "The channel was successfully deleted.", ephemeral: true })

    }
}