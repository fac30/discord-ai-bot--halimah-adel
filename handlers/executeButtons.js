// const { Events, MessageActionRow } = require("discord.js");
const { OpenAI } = require('openai');
require('dotenv/config');
// const client = require("../handlers/newClient");
const fetchHistory = require("./fetchHistory")
// const executeButtons = require("../handlers/executeButtons")

// Use API Key Directly
const openai = new OpenAI({ apiKey: process.env.API_KEY });

async function executeButtons(interaction){
    if (interaction.customId === 'direct_message') {
        try {
            const user = interaction.user;
            // console.log("interaction.user :", interaction.user);

            const conversation = await fetchHistory(interaction.message);
       
            // Extract the last user's messages from the conversation history
            const lastUserPrompt = conversation
                .filter((msg) => msg.role === 'user')
                .slice(-2, -1)
                .map((userMsg) => userMsg.content);
            // console.log('Last User message:', lastUserPrompt);

            const lastOpenAIResponse = conversation
                .filter((msg) => msg.role === 'user')
                .slice(-1)
                .map((userMsg) => userMsg.content);
            // console.log('Last AI response:', lastOpenAIResponse);

           
            // Send direct message to the user with the question and the openAI response
            user.send(`In response to your message: "${lastUserPrompt}", the AI says: "${lastOpenAIResponse}"`)
                .catch(console.error);

            // You can choose to delete the original message if needed
            // await interaction.message.delete();

            // interaction.reply({ content: 'Your direct message has been sent!', ephemeral: true });

           // Clear components (buttons) after processing the button click
           await interaction.message.edit({
                components: []
            });

        } catch (error){
            console.error('Direct Message Button:', error);
            interaction.reply({ content: `An error occurred while processing your request of "${interaction.customId}". Please try again later.`, ephemeral: true });
        }
    }

    // When press explain_more button, explain the last promp more by doing addition open ai request
    else if (interaction.customId === 'explain_more') {
        try {
            const conversation = await fetchHistory(interaction.message);
            conversation.push({
                role: 'assistant',
                content: "Explain more."
            });

            // Respond to the button click
            // interaction.reply({ content: 'Button clicked!', ephemeral: true });

            // make an open ai request
            const chatCompletion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo-1106',
                messages: conversation,
                max_tokens: 25,
            });
            const response = chatCompletion.choices[0].message.content;
    
            // Append the extended response to the previous response
            const extendedChatCompletion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo-1106',
                messages: [...conversation, { role: 'assistant', content: response }],
                max_tokens: 25,
            });

            const extendedResponse = extendedChatCompletion.choices[0].message.content;

            interaction.message.reply({ content: extendedResponse });

            // Clear components (buttons) after processing the button click
           await interaction.message.edit({
            components: []
        });
        } catch (error) {
            console.error('Explain more Button:', error);
            interaction.reply({ content: `An error occurred while processing your request of "${interaction.customId}". Please try again later.`, ephemeral: true });
        }
    }
}

module.exports = executeButtons;