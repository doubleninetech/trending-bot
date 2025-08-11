![Build Status](https://github.com/ivana17/trending-bot/actions/workflows/daily.yml/badge.svg)

# 🔥 Trending Bot

An automated Telegram bot that delivers daily trending news, Google trends, and Reddit highlights with AI-powered summaries. Built with Node.js, TypeScript, and Telegraf framework, scheduled to run via GitHub Actions.

## ✨ Features

- **🔥 Google Trends**: Fetches trending topics with 50K+ searches using Puppeteer
- **📱 Reddit Integration**: Pulls trending posts from worldnews and other subreddits
- **🌍 News Aggregation**: Collects news from BBC, Reuters, CNN, and Al Jazeera RSS feeds
- **🤖 AI Summarization**: Uses OpenRouter API to create intelligent summaries
- **⏰ Automated Scheduling**: Runs daily via GitHub Actions (every 5 minutes for testing)
- **📝 Comprehensive Logging**: Winston logging with error tracking
- **🚀 Modern Architecture**: Clean, modular TypeScript codebase
- **🔄 Graceful Shutdown**: Proper cleanup and shutdown handling
- **📘 Type Safety**: Full TypeScript support with strict type checking

## 📁 Project Structure

```
trending-bot/
├── .github/
│   └── workflows/
│       └── daily.yml      # GitHub Actions workflow for automation
├── src/
│   ├── commands/           # Bot commands
│   │   ├── index.ts       # Command setup
│   │   └── basic.ts       # Basic commands (start, help, info, ping, uptime)
│   ├── config/            # Configuration management
│   │   └── index.ts       # Environment config with validation
│   ├── services/          # Service layer
│   │   ├── ai.ts          # OpenRouter AI integration for summarization
│   │   ├── news.ts        # RSS news aggregation service
│   │   ├── reddit.ts      # Reddit JSON API integration
│   │   ├── scheduler.ts   # Main scheduler and message sender
│   │   └── trends.ts      # Google Trends scraper with Puppeteer
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Common types and interfaces
│   ├── utils/             # Utility functions
│   │   ├── logger.ts      # Winston logging configuration
│   │   └── shutdown.ts    # Graceful shutdown handler
│   └── index.ts           # Main bot entry point
├── dist/                  # Compiled JavaScript (auto-generated)
├── logs/                  # Log files (auto-created)
├── .env.example          # Environment variables template
├── jest.config.js        # Jest testing configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18.0.0 or higher
- TypeScript (installed via npm)
- A Telegram Bot Token (get from [@BotFather](https://t.me/BotFather))
- OpenRouter API Key for AI summaries

### 2. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd trending-bot

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Configuration

Edit the `.env` file with your configuration:

```env
BOT_TOKEN=your_telegram_bot_token_here
CHANNEL_USERNAME=your_telegram_channel_username
OPENROUTER_API_KEY=your_openrouter_api_key_for_ai_summaries
```

### 4. Running the Bot

```bash
# Development (with auto-restart and TypeScript compilation)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Production (run compiled JavaScript)
npm start

# Type checking without compilation
npm run typecheck

# Run tests
npm test

# Lint TypeScript code
npm run lint
```

## 🎯 Available Commands

### Basic Commands

- `/start` - Initialize the bot and show welcome message
- `/help` - Display help information and available commands
- `/info` - Show bot information, version, and uptime
- `/ping` - Test bot responsiveness with latency measurement
- `/uptime` - Display detailed bot uptime statistics

### Automated Features

- **Daily Trending Feed**: Automatically posts daily trending content to the configured channel
- **Multi-Source Aggregation**: Combines Google Trends, Reddit posts, and global news
- **AI-Powered Summaries**: Creates intelligent summaries of news and Reddit content

## ⚙️ Configuration

### Environment Variables

| Variable             | Description                                  | Required |
| -------------------- | -------------------------------------------- | -------- |
| `BOT_TOKEN`          | Telegram bot token from @BotFather           | ✅       |
| `CHANNEL_USERNAME`   | Target Telegram channel username (without @) | ✅       |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI summarization      | ✅       |

### Core Services

- **Google Trends Service**: Scrapes trending topics using Puppeteer with headless Chrome
- **Reddit Service**: Fetches posts from worldnews and other subreddits via JSON API
- **News Service**: Aggregates RSS feeds from BBC, Reuters, CNN, and Al Jazeera
- **AI Service**: Generates intelligent summaries using OpenRouter's API
- **Scheduler Service**: Coordinates daily message generation and posting
- **Logging**: Structured logging with Winston for monitoring and debugging
- **Graceful Shutdown**: Proper cleanup on exit with job termination

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🔧 Development

### TypeScript Development

The project uses TypeScript with strict type checking:

```bash
# Check types without compilation
npm run typecheck

# Build TypeScript to JavaScript
npm run build

# Development with hot reload
npm run dev
```

### Code Quality

The project uses ESLint for TypeScript code quality:

```bash
# Lint TypeScript code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Adding New Commands

1. Create your command in the appropriate file (`src/commands/`)
2. Use proper TypeScript types for the context
3. Register it in the setup function
4. Add tests for the new functionality

### Adding New Services

1. Create a new service in `src/services/`
2. Implement the service with proper TypeScript interfaces
3. Import and use in the scheduler service
4. Update configuration if needed

## 🚀 Deployment

### Development

For local development and testing:

```bash
# Development with hot reload
npm run dev

# Build and run locally
npm run build
npm start
```

### Production (GitHub Actions)

The bot runs automatically via GitHub Actions:

- **Schedule**: Every 5 minutes (configured in `.github/workflows/daily.yml`)
- **Trigger**: Can also be manually triggered via GitHub Actions interface
- **Environment**: Ubuntu latest with Node.js 20
- **Process**: Compiles TypeScript, runs once, sends message, then exits

#### GitHub Secrets Required:

- `BOT_TOKEN`: Your Telegram bot token
- `CHANNEL_USERNAME`: Your channel username
- `OPENROUTER_API_KEY`: Your OpenRouter API key

### Manual Deployment

```bash
# Build TypeScript
npm run build

# Run once (sends message and exits)
node dist/index.js
```

### Logs

Logs are stored in the `logs/` directory:

- `logs/bot.log` - All logs
- `logs/error.log` - Error logs only

## 📝 License

This project is licensed under the MIT License.

---

Built with ❤️ using Node.js, TypeScript, Telegraf, Puppeteer, and OpenRouter AI
