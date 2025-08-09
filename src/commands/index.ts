import { Telegraf } from 'telegraf';
import logger from '../utils/logger';
import { basicCommands } from './basic';
import { BotContext } from '../types';

export function setupCommands(bot: Telegraf<BotContext>): void {
  logger.info('Setting up bot commands...');

  // Setup basic commands
  basicCommands(bot);

  // Default handler for unknown commands
  bot.on('text', (ctx: BotContext, next: () => Promise<void>) => {
    // In a 'text' handler, ctx.message is guaranteed to be a text message
    if (!ctx.message || !('text' in ctx.message)) return next();

    const message = ctx.message.text;
    if (message.startsWith('/')) {
      const command = message.split(' ')[0];
      logger.warn('Unknown command used', {
        command,
        userId: ctx.from?.id,
        username: ctx.from?.username,
      });

      void ctx.reply(
        `❓ Unknown command: ${command}\n\nUse /help to see available commands.`,
        { reply_parameters: { message_id: ctx.message.message_id } }
      );
      return;
    }

    return next();
  });

  logger.info('Commands setup completed');
}
