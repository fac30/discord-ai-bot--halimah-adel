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



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

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
9. Enter your API and Discord Token in `.env`
   ```
   TOKEN=ENTER-TOKEN-HERE
   API_KEY=ENTER-API-KEY-HERE
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Set up a new Node.js project with `.env`, `openai` and `discord.js` libraries
- [ ] Initialise bot and start listening for messages
- [ ] Add message handling
- [ ] Optimise event handling
- [ ] Integrate OpenAI into the bot
- [ ] Manage OpenAI response
- [ ] Add command prefix
- [ ] Implement error handling

### Stretch goals

If we have time, we aim to attempt some of these stretch goals:

- [ ] Enable the bot to message users directly
- [ ] Implement dialogue boxes and interactive responses
- [ ] Create private channels
- [ ] Automated moderation
- [ ] Add multimedia responses

See the [open issues](https://github.com/fac30/discord-ai-bot--halimah-adel/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



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