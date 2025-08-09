import { Telegraf } from 'telegraf';
import config from './config';
import logger from './utils/logger';
import { setupCommands } from './commands';
import { gracefulShutdown } from './utils/shutdown';
import SchedulerService from './services/scheduler';
import { BotContext } from './types';

class HotBot {
  private bot: Telegraf<BotContext>;
  private isShuttingDown: boolean;
  private scheduler: SchedulerService;

  constructor() {
    this.bot = new Telegraf<BotContext>(config.telegram.botToken);
    this.isShuttingDown = false;
    this.scheduler = new SchedulerService(this.bot);
  }

  async initialize(): Promise<void> {
    try {
      logger.info('Initializing Hot Bot...');

      // Setup commands
      setupCommands(this.bot);

      // Error handling
      this.bot.catch((err: unknown, ctx: BotContext) => {
        logger.error('Bot error occurred:', err);
        void ctx.reply('❌ An error occurred. Please try again later.');
      });

      // Setup graceful shutdown
      this.setupGracefulShutdown();

      // Start scheduler service for daily hello messages
      this.scheduler.start();

      logger.info('Hot Bot initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize bot:', error);
      process.exit(1);
    }
  }

  async start(): Promise<void> {
    try {
      await this.initialize();

      await this.bot.launch();
      logger.info('Bot started with polling');

      logger.info(`Hot Bot is running as @${this.bot.botInfo?.username}`);
    } catch (error) {
      logger.error('Failed to start bot:', error);
      process.exit(1);
    }
  }

  private setupGracefulShutdown(): void {
    const shutdown = async (signal: string): Promise<void> => {
      if (this.isShuttingDown) return;
      this.isShuttingDown = true;

      logger.info(`Received ${signal}, shutting down gracefully...`);

      // Stop scheduler first
      this.scheduler.stop();

      await gracefulShutdown(this.bot);
      process.exit(0);
    };

    process.once('SIGINT', () => void shutdown('SIGINT'));
    process.once('SIGTERM', () => void shutdown('SIGTERM'));
  }
}

// Start the bot
if (require.main === module) {
  const hotBot = new HotBot();
  hotBot.start().catch(error => {
    logger.error('Fatal error starting bot:', error);
    process.exit(1);
  });
}

export default HotBot;
