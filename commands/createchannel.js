const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, GuildCategory } = require('discord.js');
const client = require("../handlers/newClient");


module.exports = {
	data: new SlashCommandBuilder()
        .setName('create-channel')
        .setDescription('Create a custom discord channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption(option =>
            option.setName("channelType")
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
                .addChannelTypes(ChannelType.GuildCategory)                )
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

    
};