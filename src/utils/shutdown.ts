import { Telegraf } from 'telegraf';
import logger from './logger';
import { BotContext } from '../types';

export async function gracefulShutdown(
  bot: Telegraf<BotContext>
): Promise<void> {
  try {
    logger.info('Starting graceful shutdown...');

    // Stop the bot
    if (bot) {
      await bot.stop('SIGTERM');
      logger.info('Bot stopped successfully');
    }

    // Close any open connections, clean up resources
    // Add any additional cleanup logic here

    logger.info('Graceful shutdown completed');
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    throw error;
  }
}
