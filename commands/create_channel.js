const { SlashCommandBuilder, PermissionsBitField, ChannelType, GuildCategory} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('create_channel')
        .setDescription('Create a custom discord channel')
        .setDefaultMemberPermissions(PermissionsBitField.ManageChannels)
        .addStringOption(option =>
            option.setName("channeltype")
            .setRequired(true)
            .setDescription("Set the type of the channel")
            .addChoices(
                {name: "Text channel", value: "textchannel"},
                {name: "Voice channel", value: "voicechannel"}
            )
            )
        .addStringOption(option =>
            option.setName("channelname")
                .setDescription("Set the name of the channel.")
                .setRequired(true)
            )
        .addChannelOption(option =>
            option.setName("parent")
                .setDescription("Set the parent of the channel")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildCategory)
        )
        .addRoleOption(option =>
            option.setName("permission-role")
                .setDescription("The permission-role for the channel")
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName("everyone")
                .setDescription("Tag @everyone")
                .setRequired(true)
        ),

    async execute(interaction) {
        try{
        console.log(interaction);

        const { guild, member, options } = interaction;;
        const { VIEW_CHANNEL, READ_MESSAGE_HISTORY, SEND_MESSAGES, CONNECT, SPEAK } = PermissionsBitField;
        
        const channeltype = options.getString("channeltype");
        const channelname = options.getString("channelname");
        const parent = options.getChannel("parent");
        const permissions = options.getRole("permission-role");
        const everyone = options.getRole("everyone");

        if(channeltype === "textchannel") {
            await interaction.guild.channels.create({
                name: `${channelname}`,
                type: ChannelType.GuildText,
                parent: parent,

                permissionOverwrites: [
                 {
                    id: permissions,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.ManageChannels],
                 }, 
                 {
                    id: everyone,
                    deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.ManageChannels],
                 }
                ]
            })
        }

        if(channeltype === "voicechannel"){
            await interaction.guild.channels.create({
                name: `${channelname}`,
                type: ChannelType.GuildVoice,
                parent: parent,

                permissionOverwrites: [
                 {
                    id: permissions,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak, PermissionsBitField.Flags.ManageChannels],
                 }, 
                 {
                    id: everyone,
                    deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak, PermissionsBitField.Flags.ManageChannels],
                 }
                ]
            })
        }

        await interaction.reply({ content: "The channel was successfully created.", ephemeral: true })


    } catch (error){
        console.error('Channel create command execution error:', error);
    }
    },
};