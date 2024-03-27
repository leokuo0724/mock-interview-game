# Mock Interview Game

[![Cover](/src/assets/cover.png)](https://mock-interview-game.netlify.app/)

![SolidJS](https://img.shields.io/badge/solidjS-1.8.11-blue?style=for-the-badge)
![Phaser](https://img.shields.io/badge/phaser-3.70.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

This is a fun and interactive mock interview game built using the [SolidJS](https://www.solidjs.com/) framework and [Phaser](https://phaser.io/) game engine. User can play through a series of interview questions while enjoying a game experience.

## Demo

A live demo of the Mock Interview Game can be found [here](https://mock-interview-game.netlify.app/).

## Getting Started for developers

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/leokuo0724/mock-interview-game.git
```

2. Navigate to the project directory:

```bash
cd mock-interview-game
```

3. Install dependencies using pnpm:

```bash
pnpm install
```

4. Start the development server:

```bash
pnpm dev
```

## Configuration

In dev mode, it will read OpenAI's key in environment variable by default. You should add your OpenAI API key by following steps:

1. Get your OpenAI API key from the [OpenAI website](https://openai.com/)
2. Create a `.env` file in the root directory of the project.
3. Add your OpenAI API key to the `.env` file:

```env
VITE_OPENAI_API_KEY=your-api-key-here
```

4. Save the `.env` file.
5. Restart the development server

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE.md) file for details.

## Acknowledgments

- SolidJS: https://solidjs.com/
- Phaser: https://phaser.io/
- OpenAI: https://openai.com/
