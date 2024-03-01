<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Halimah's LinkedIn][linkedin-shield]][linkedin-url]
[![Adel's LinkedIn][linkedin-shield]][linkedin-url2]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/fac30/discord-ai-bot--halimah-adel">
    <img src="assets/AI Bot.png" alt="Waving robot to imply Artificial Intelligence" width="80" height="80">
  </a>

<h3 align="center">Discord AI bot</h3>

  <p align="center">
    A Discord chat bot that acts as a helpful AI assistant, using ChatGPT
    <br />
    <a href="https://github.com/fac30/discord-ai-bot--halimah-adel"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/fac30/discord-ai-bot--halimah-adel">View Demo</a>
    ·
    <a href="https://github.com/fac30/discord-ai-bot--halimah-adel/issues">Report Bug</a>
    ·
    <a href="https://github.com/fac30/discord-ai-bot--halimah-adel/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Discord AI Bot in use][product-screenshot]]()

Halimah and Adel's second project for Founders and Coders bootcamp: a Discord AI bot, made using asynchronous functions and Node.js.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Node][Node.js]][Node-url]
* [![Discord][Discord.js]][Discord-url]
* [![Dotenv][.env]][Dotenv-url]
* [![OpenAI][openai]][openai-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- INSTALLATION -->
## Installation

If you want to install this project on your local machine and play around with it, follow these steps:

1. Get a free API Key at [OpenAI](https://platform.openai.com/api-keys)
2. Create a bot on [Discord Developers](https://discord.com/developers/applications)
3. Assign the permissions you want the bot to have (ensure you select `bot` and `applications.commands`) and generate a URL
4. Invite your bot to a server you manage by pasting the generated link
5. Get your bot's token
6. Clone the repo
   ```sh
   git clone https://github.com/fac30/discord-ai-bot--halimah-adel.git
   ```
7. Install NPM packages
   ```sh
   npm install
   ```
8. Enter your API and Discord Token in `.env`
   ```
   TOKEN=ENTER-TOKEN-HERE
   API_KEY=ENTER-API-KEY-HERE
   ```
9. Launch your bot in the terminal so it goes online
  ```sh
    node index.js
  ```

  (**Note:** you can optionally install `nodemon` as a global package so you don't have to launch your bot in the terminal every time you make a change to the code.)
  ```sh
  npm install -g nodemon
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

If you want to play around with the bot as it's currently configured, ensure you type `!` before your message, so the bot knows you're talking to it instead of another user. Then ask it any question you'd like.

To ensure the API Key isn't overloaded, there is a token limit, so you might not get as full an answer as you expect.

You can change this by increasing the `max_tokens` value in `index.js`, line 83:
```js
max_tokens: 25,
```

Make sure to save after making this change!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Set up a new Node.js project with `.env`, `openai` and `discord.js` libraries
- [x] Initialise bot and start listening for messages
- [x] Add message handling
- [x] Optimise event handling
- [x] Integrate OpenAI into the bot
- [x] Manage OpenAI response
- [x] Add command prefix
- [x] Implement error handling

### Stretch goals

If we have time, we aim to attempt some of these stretch goals:

- [ ] Enable the bot to message users directly
- [ ] Implement dialogue boxes and interactive responses
- [ ] Create private channels
- [ ] Automated moderation
- [ ] Add multimedia responses

See the [open issues](https://github.com/fac30/discord-ai-bot--halimah-adel/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- TESTING -->
## Testing

"Writing tests is an important part of software development. It allows you to ensure that your code works as intended and catches any potential bugs or errors before they make it into production."

In out Discord Bot project, we use the built in node.js test library.

It requires the following steps: 
  * import the tester libary in each test file
    ```sh
    const assert = require('assert');
    const test = require('node:test');
    ```

  * write a test useing assert method,
    create an expected and recieved value, which the test will compare with the assert.

    | Method | Descreption |
    |  :---:  |  :---:  |
    | assert.deepEqual | Checks if two values are equal |
    | assert.strictEqual | Checks if two values are equal |
    | assert.notDeepEqual | Checks if two value are not equal |
    | assert.notStrictEqual | Checks if two value are not equal |
    | assert.fail | throw an Assertion Error |
    | assert.ifError | Throw a specified error if the specified error evaluates to true |
    | assert.ok | Check if a value is true |


  * An example of test
    ```sh
      test('descreption of the test', () => {
          try {
            assert.strictEqual(typeof variable, 'object', 'variable should be an object');
            assert.ok(variable instanceof Class, true, 'varible should be an instance of discord.js Class');
          } catch (error) {
              assert.fail(`event failed: ${error.message}`);
          }
      });
    ```

  * Add the testable test file to the package.json
    ```
    "scripts": {
        "ready-test": "node ./tests/test.nameOfTest.js",
     },
    ```

  * run the test in the terminal
    ```sh
    npm run test
    ```


<!-- CONTRIBUTING -->
## Contributing

If you'd like to contribute to this project, you can fork the project and open a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature`)
3. Commit your Changes (`git commit -m 'Add some feature'`)
4. Push to the Branch (`git push origin feature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/fac30/discord-ai-bot--halimah-adel](https://github.com/fac30/discord-ai-bot--halimah-adel)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

We used a number of resources to understand how to use OpenAI's API and Discord.js to create an AI chat bot. This includes official documentation:

* Discord.js [official documentation](https://discordjs.guide/#before-you-begin)
* OpenAI [API documentation](https://platform.openai.com/docs/introduction)

And online tutorials. Thanks to the following creators for their excellent tutorials on creating a Discord AI bot:

* Beau Carnes: creating a [Discord bot](https://www.freecodecamp.org/news/create-a-discord-bot-with-javascript-nodejs/)
* UnderCtrl: creating a [Chat GPT Discord bot](https://www.youtube.com/watch?v=EUlnKW6Yy94&t=1053s)
* Omnidev: creating a [Discord AI chat bot](https://www.youtube.com/watch?v=TVDHpjLymiM&t=301s)
* EvenMoreCode: creating a [Discord File Structure: handeling commands and events](https://www.youtube.com/watch?v=N3rNVWBOaS8&list=PLGR8P08gl389KuHZjU9QCZlIMioUAIKcl&index=4)


And, of course, huge thanks to [othneildrew](https://github.com/othneildrew) for the comprehensive [README template](https://github.com/othneildrew/Best-README-Template) that we built this README with!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/fac30/discord-ai-bot--halimah-adel.svg?style=for-the-badge
[contributors-url]: https://github.com/fac30/discord-ai-bot--halimah-adel/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/fac30/discord-ai-bot--halimah-adel.svg?style=for-the-badge
[forks-url]: https://github.com/fac30/discord-ai-bot--halimah-adel/network/members
[stars-shield]: https://img.shields.io/github/stars/fac30/discord-ai-bot--halimah-adel.svg?style=for-the-badge
[stars-url]: https://github.com/fac30/discord-ai-bot--halimah-adel/stargazers
[issues-shield]: https://img.shields.io/github/issues/fac30/discord-ai-bot--halimah-adel.svg?style=for-the-badge
[issues-url]: https://github.com/fac30/discord-ai-bot--halimah-adel/issues
[license-shield]: https://img.shields.io/github/license/fac30/discord-ai-bot--halimah-adel.svg?style=for-the-badge
[license-url]: https://github.com/fac30/discord-ai-bot--halimah-adel/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/halimahmanan
[linkedin-url2]: https://www.linkedin.com/in/adel-k-54b142162/
[product-screenshot]: assets/ai-bot-in-use.png
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Discord.js]: https://img.shields.io/badge/Discord.JS-7289DA?style=for-the-badge&logo=discord&logoColor=white
[Discord-url]: https://discord.js.org/
[.env]: https://img.shields.io/badge/Dotenv-000000?style=for-the-badge&logo=.env
[Dotenv-url]: https://www.dotenv.org/
[OpenAI]: https://img.shields.io/badge/OpenAI-10a37f?style=for-the-badge&logo=openai&logoColor=white
[openai-url]: https://platform.openai.com/docs/introduction