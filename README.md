![Build Status](https://github.com/ivana17/hot-bot/actions/workflows/daily.yml/badge.svg)

# 🔥 Hot Bot

A scalable and feature-rich Telegram bot built with Node.js, TypeScript, and Telegraf framework.

## ✨ Features

- **🚀 Modern Architecture**: Clean, modular code structure with TypeScript
- **🔧 Configurable**: Environment-based configuration system
- **📝 Logging**: Comprehensive logging with Winston
- **🧪 Testing**: Jest testing framework with TypeScript support
- **🔄 Graceful Shutdown**: Proper cleanup and shutdown handling
- **📘 Type Safety**: Full TypeScript support with strict type checking

## 📁 Project Structure

```
hot-bot/
├── src/
│   ├── commands/           # Bot commands
│   │   ├── index.ts       # Command setup
│   │   ├── basic.ts       # Basic commands (start, help, info)
│   ├── config/            # Configuration management
│   │   └── index.ts       # Main config file
│   ├── services/          # Service layer
│   │   └── ...            # Data source services
│   │   └── scheduler.ts   # Cron job scheduler
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Common types and interfaces
│   ├── utils/             # Utility functions
│   │   ├── logger.ts      # Logging configuration
│   │   └── shutdown.ts    # Graceful shutdown handler
│   └── index.ts           # Main bot entry point
├── tests/                 # Test files
│   ├── setup.ts          # Test configuration
│   └── bot.test.ts       # Main bot tests
├── dist/                  # Compiled JavaScript (auto-generated)
├── logs/                  # Log files (auto-created)
├── .env.example          # Environment variables template
├── .eslintrc.js          # ESLint configuration for TypeScript
├── jest.config.js        # Jest testing configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18.0.0 or higher
- TypeScript (installed via npm)
- A Telegram Bot Token (get from [@BotFather](https://t.me/BotFather))

### 2. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd hot-bot

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env with your bot token
nano .env
```

### 3. Configuration

Edit the `.env` file with your configuration:

```env
BOT_TOKEN=your_telegram_bot_token_here
CHANNEL_USERNAME=your_telegram_channel
OPENROUTER_API_KEY=your_openrouter_api_key
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
- `/help` - Display help information
- `/info` - Show bot information and status
- `/ping` - Test bot responsiveness
- `/uptime` - Display bot uptime

## ⚙️ Configuration

### Environment Variables

| Variable                  | Description                           |
| ------------------------- | ------------------------------------- |
| `BOT_TOKEN`               | Telegram bot token                    |
| `CHANNEL_USERNAME`        | Telegram channel username             |
| `OPENROUTER_API_KEY`      | OpenRouter API Key                    |

### Features

- **Logging**: Structured logging with Winston
- **Graceful Shutdown**: Proper cleanup on exit
- **Type Safety**: Full TypeScript support with interfaces
- **Scheduled Tasks**: Cron job support for automated tasks

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

## 🚀 Deployment

### Development

```bash
npm run dev
```

### Production

Build the TypeScript code:

```bash
npm run build
```

Start the bot:

```bash
npm start
```

### Logs

Logs are stored in the `logs/` directory:

- `logs/bot.log` - All logs
- `logs/error.log` - Error logs only

## 📝 License

This project is licensed under the MIT License.

---

Built with ❤️ using Node.js, TypeScript, and Telegraf
