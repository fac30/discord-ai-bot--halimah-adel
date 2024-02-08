// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    //GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
  console.log(`Ready logged! Logged in as ${readyClient.user.tag}`);
});

// Use API Key Directly
const openai = new OpenAI({ apiKey: process.env.API_KEY });

// Event listener for incoming messages
client.on('messageCreate', async msg => {
  // Ignore messages from bots and empty messages
  if (msg.author.bot || !msg.content) return;

  // Test chat connection
  if (msg.content === '!hello') {
    //msg.reply('Hey!');
	msg.channel.send('Halliioo');
  }

  // Connect to OpenAI with Error Handling
  try {
    const chatCompletion = await openai.chat.completions.create({
	  model: 'gpt-3.5-turbo-1106',
      messages: [{ role: 'user', content: 'Say this is a test' }],
      max_tokens: 10
    });

    // Console log the chatCompletion in JSON
    console.log(JSON.stringify(chatCompletion, null, 2));
    //msg.reply(chatCompletion.choices[0].message.content);
	msg.channel.send(chatCompletion.choices[0].message.content);

  } catch (error) {
      console.error('OpenAI Error:', error.message);
  	}
});

// Log in to Discord with your client's token
client.login(token);
