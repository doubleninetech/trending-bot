import { Telegraf } from 'telegraf';
import logger from '../utils/logger';
import { BotContext } from '../types';

export function basicCommands(bot: Telegraf<BotContext>): void {
  // Start command
  bot.start((ctx: BotContext) => {
    const user = ctx.from;
    if (user) {
      logger.info('User started bot', {
        firstName: user.first_name,
      });
    }

    const welcomeMessage = `
🔥 Welcome to Hot Bot!

I'm here to send you a friendly hello message every minute!

🎯 **Basic Commands:**
/help - Show this help message
/info - Get bot information
/ping - Check if I'm responsive

Type /help for more detailed information about each command.

Let's get started! 🚀`;

    void ctx.reply(welcomeMessage);
  });

  // Help command
  bot.help((ctx: BotContext) => {
    const helpMessage = `
📖 **Hot Bot Help**

**Basic Commands:**
• /start - Initialize the bot
• /help - Show this help message
• /info - Display bot information
• /ping - Test bot responsiveness
• /uptime - Show bot uptime

**Daily Feature:**
🌅 I'll send you a friendly hello message every minute!

**Tips:**
• Commands are case-sensitive
• Have fun and enjoy your regular greetings!

Need help? Just ask! 😊`;

    void ctx.reply(helpMessage);
  });

  // Info command
  bot.command('info', (ctx: BotContext) => {
    const uptimeSeconds = process.uptime();
    const uptimeDays = Math.floor(uptimeSeconds / 86400);
    const uptimeHours = Math.floor((uptimeSeconds % 86400) / 3600);
    const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60);

    const infoMessage = `
ℹ️ **Bot Information**

**Name:** Hot Bot
**Version:** 1.0.0
**Uptime:** ${uptimeDays}d ${uptimeHours}h ${uptimeMinutes}m

**Features:**
✅ Regular hello messages
✅ Logging system

**Node.js:** ${process.version}
**Memory Usage:** ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB

Built with ❤️ using Telegraf

🌅 I send hello messages every minute to brighten your day!`;

    void ctx.reply(infoMessage);
  });

  // Ping command
  bot.command('ping', (ctx: BotContext) => {
    const start = Date.now();
    void ctx.reply('🏓 Pong!').then(() => {
      const latency = Date.now() - start;
      void ctx.reply(`⚡ Response time: ${latency}ms`);
    });
  });

  // Uptime command
  bot.command('uptime', (ctx: BotContext) => {
    const uptimeSeconds = process.uptime();
    const uptimeDays = Math.floor(uptimeSeconds / 86400);
    const uptimeHours = Math.floor((uptimeSeconds % 86400) / 3600);
    const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60);
    const uptimeSecondsRemainder = Math.floor(uptimeSeconds % 60);

    void ctx.reply(
      `⏱️ Bot uptime: ${uptimeDays}d ${uptimeHours}h ${uptimeMinutes}m ${uptimeSecondsRemainder}s`
    );
  });
}
