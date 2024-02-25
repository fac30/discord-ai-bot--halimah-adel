// from messageCreate.js copied temporary

else if (msg.content.startsWith('!dialog')) {
    // console.log({msg});
    // const deleti = new ButtonBuilder()
    //     .setCustomId('deleti')
    //     .setLabel('Delete')
    //     .setStyle(ButtonStyle.Danger) 

    const select = new StringSelectMenuBuilder()
        .setCustomId('starter')
        .setPlaceholder('Make a selection!')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Bulbasaur')
                .setDescription('Bulbasaur.')
                .setEmoji('🌱') // Set emoji instead of setImage
                .setValue('bulbasaur'),
    
            new StringSelectMenuOptionBuilder()
                .setLabel('Charmander')
                .setDescription('The Fire-type.')
                .setEmoji('🔥') // Set emoji instead of setImage
                .setValue('charmander'),
    
            new StringSelectMenuOptionBuilder()
                .setLabel('Squirtle')
                .setDescription('TSquirtle.')
                .setEmoji('💧') // Set emoji instead of setImage
                .setValue('squirtle'),
        );
    // const menu = new  MessageSelectMenu()
    //     .setCustomId('example_select_menu')
    //     .setPlaceholder('Select an option')
    //     .addOptions([
    //         {
    //             label: 'Option 1',
    //             value: 'option_1',
    //         },
    //         {
    //             label: 'Option 2',
    //             value: 'option_2',
    //         },
    //     ])

    const row = new ActionRowBuilder()
        .addComponents(select);

       
    msg.reply({
        content: '',
        components: [row],
    });
} 