// const { Events } = require('discord.js');
const { OpenAI } = require('openai');
const fetchHistory = require("./fetchHistory");
require('dotenv/config');

// Use API Key Directly
const openai = new OpenAI({ apiKey: process.env.API_KEY });


const openApiRequest = async (msg) => {
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


 module.exports = openApiRequest;