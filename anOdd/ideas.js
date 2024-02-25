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




// ---------- CUT FROM ORIGINAL INDEX.JS --------------

// load the events files on startup
// const eventsPath = path.join(__dirname, "events");
// const eventFiles = fs
//     .readdirSync(eventsPath)
//     .filter((file) => file.endsWith(".js"));

// for (const file of eventFiles) {
//     const filePath = path.join(eventsPath, file);
//     const event = require(filePath);
//     if(event.once) {
//         client.once(event.name, (...args) => event.execute(...args));
//     } else {
//         client.on(event.name, (...args) => event.execute(...args));
//     }
// }

// load the command files on startup
// client.commands = new Collection();
// const commandsPath = path.join(__dirname, "commands");
// const commandFiles = fs
//     .readdirSync(commandsPath)
//     .filter((file) => file.endsWith(".js"));

// for (const file of commandFiles) {
//     const filePath = path.join(commandsPath, file);
//     const command = require(filePath);
//     if("data" in command && "execute" in command) {
//         client.commands.set(command.data.name, command); 
//     } else {
//         console.log(
//             `[WARNING] The command at ${filePath} is missing a required "data" or "execute property"`
//         );
//     }
// }