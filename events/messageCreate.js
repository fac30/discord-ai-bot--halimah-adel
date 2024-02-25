const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const { OpenAI } = require('openai');
const client = require("../handlers/newClient");
const fetchHistory = require("../handlers/fetchHistory");


// Use API Key Directly
const openai = new OpenAI({ apiKey: process.env.API_KEY });

const openApiRequirest = async (msg) => {
    try{
        // Type effect while bot fetch respond from openAI
        await msg.channel.sendTyping();

        const conversation = await fetchHistory(msg);

        // Post prompt and Get openAI response
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-1106',
            messages: conversation,
            max_tokens: 30,
        });

        const response = chatCompletion.choices[0].message.content;
        // console.log(JSON.stringify(chatCompletion, null, 2));
        return { response };
        
    } catch (error) {
            console.error('openAI Request Error:', error);
    }
}


module.exports = {
    name: Events.MessageCreate,
    async execute(msg) {        
        // Ignore messages from bots and empty messages
        if (msg.author.bot || !msg.content) return;

        // Test chat connection
        if (msg.content === 'hello') {
            msg.reply('Hey!');
        }

        // Ignore message if it doesn't start with !
        if (!msg.content.startsWith('!')) return;

        
      
            
        // Connect to OpenAI with Error Handling to recieve respond for prompt
        try {
            // const conversation = await fetchHistory(msg);

            
            // Fetch openAI request
            // const chatCompletion = await openai.chat.completions.create({
            //     model: 'gpt-3.5-turbo-1106',
            //     messages: conversation,
            //     max_tokens: 25,
            // });
    
            // const response = chatCompletion.choices[0].message.content;
            // console.log('OpenAI Response:', response);
            // console.log(JSON.stringify(chatCompletion, null, 2));
            const { response } = await openApiRequirest(msg);
            
            // Direct message the openAI respond to the user with the user prompt which will be removed 
            if (msg.content.startsWith('!private')) {
                try {
                    const user = await client.users.fetch(msg.author.id);
                    //console.log(`userName: ${user}`);
                    user.send(`In response to your message: "${msg.content}", the AI says: "${response}"`)
                        //.then(msg => console.log(`Sent message: ${msg.content} to ${user}`))
                        .catch(console.error);
                    // Delete the original message
                    await msg.delete();
                    await msg.reply(`Your private message has been processed.`);
                }
                catch (error) {
                    console.error('Error during "!private" Direct Message, bc fetching user or dm or confirm dm.', error);
                }
            }
            //Add Buttons to openAI respond in every prompt
            else {
                const explain = new ButtonBuilder()
                    .setCustomId('explain_more')
                    .setLabel('Explain more')
                    .setStyle(ButtonStyle.Primary)               

                const direct = new ButtonBuilder()
                    .setCustomId('direct_message')
                    .setLabel('Direct Message')
                    .setStyle(ButtonStyle.Success) 
                
                const google = new ButtonBuilder()
                    .setLabel('Google')
                    .setURL('https://www.google.com')
                    .setStyle(ButtonStyle.Link);
                
                const row = new ActionRowBuilder()
                    .addComponents(explain, direct, google);

                msg.reply({
                    content: response,
                    components: [row],
                });
            }
        }
        catch (error) {
            console.error('Conversation history error:', error);
            console.error('OpenAI Error:', error);
            msg.reply('An error occurred while processing your request. Please try again later.');
        }  
    }
}




