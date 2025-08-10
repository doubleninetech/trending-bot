import cron from 'node-cron';
import { Telegraf } from 'telegraf';
import logger from '../utils/logger';
import { summarizeHeadlines } from './ai';
import { BotContext } from '../types';
import config from '../config';

const MAX_TRENDS = 8;
const CRON_TIMEZONE = 'UTC';

export default class SchedulerService {
  private bot: Telegraf<BotContext>;
  private jobs: Map<string, cron.ScheduledTask>;

  constructor(bot: Telegraf<BotContext>) {
    this.bot = bot;
    this.jobs = new Map();
  }

  async start(): Promise<void> {
    // No need for scheduling, Github Actions will run the job every day at 10AM UTC
    // So the script will run only once at startup
    try {
      await this.sendGlobalNewsFeed();
      logger.info('Global news feed process completed successfully');
    } catch (error) {
      logger.error('Error in global news feed process:', error);
      process.exit(1); // Exit with error code if the process fails
    }

    // Exit the script after sending the message
    // Otherwise, the script will be cancelled after 6 hours by Github Actions
    process.exit(0);
  }

  stop(): void {
    logger.info('Stopping scheduler service...');

    for (const [name, job] of this.jobs) {
      job.stop();
      logger.info(`Stopped scheduled job: ${name}`);
    }

    this.jobs.clear();
    logger.info('Scheduler service stopped');
  }

  scheduleJob(
    name: string,
    cronExpression: string,
    callback: () => void | Promise<void>
  ): void {
    try {
      const job = cron.schedule(cronExpression, callback, {
        scheduled: false,
        timezone: CRON_TIMEZONE,
      });

      this.jobs.set(name, job);
      job.start();

      logger.info(`Scheduled job: ${name} with expression: ${cronExpression}`);
    } catch (error) {
      logger.error(`Failed to schedule job ${name}:`, error);
    }
  }

  removeJob(name: string): boolean {
    const job = this.jobs.get(name);
    if (job) {
      job.stop();
      this.jobs.delete(name);
      logger.info(`Removed scheduled job: ${name}`);
      return true;
    }
    return false;
  }

  async sendGlobalNewsFeed(): Promise<void> {
    try {
      // Fetch from multiple sources
      const { RedditService } = await import('./reddit');
      const { NewsService } = await import('./news');
      const { TrendsService } = await import('./trends');

      const reddit = new RedditService();
      const newsService = new NewsService();
      const trendsService = new TrendsService();

      // Fetch Reddit trends
      const redditFeed = await reddit.fetchSubredditPosts(
        'worldnews',
        MAX_TRENDS
      );
      const redditPosts = redditFeed?.items || [];

      const newsFeed = await newsService.fetchNews('bbc', MAX_TRENDS);
      const newsArticles = newsFeed?.items || [];

      // Fetch Google Trends
      const trendsLine = await trendsService.fetchTrends(25);

      // Build Reddit and News sections as raw text
      let redditSection = '';
      if (Array.isArray(redditPosts) && redditPosts.length > 0) {
        redditSection += `\n📱 *REDDIT TRENDING* \n`;

        // Filter out live threads and other unwanted posts
        const filteredPosts = redditPosts.filter((post: { title: string }) => {
          return !post.title.toLowerCase().includes('live thread');
        });

        filteredPosts
          .slice(0, 5)
          .forEach((post: { title: string }, index: number) => {
            redditSection += `${index + 1}. ${post.title}\n`;
          });
      }

      let newsSection = '';
      if (Array.isArray(newsArticles) && newsArticles.length > 0) {
        newsSection += `\n🌍 *WORLD NEWS* \n`;
        newsArticles
          .slice(0, 5)
          .forEach((article: { title: string }, index: number) => {
            newsSection += `${index + 1}. ${article.title}\n`;
          });
      }

      // Summarize Reddit and News sections using OpenRouter
      let summarizedSections = `${redditSection}\n${newsSection}`;
      if (redditSection || newsSection) {
        try {
          summarizedSections = await summarizeHeadlines(
            redditSection,
            newsSection
          );
        } catch (err) {
          logger.error(
            'AI summarization failed, falling back to original data:',
            err
          );
          summarizedSections = `${redditSection}\n${newsSection}`;
        }
      }

      // Build combined message with all sections
      let message = '';

      // Google Trends Section
      if (trendsLine) {
        message += `🔥 *GOOGLE TRENDS*\n${trendsLine}\n\n`;
      }

      // Summarized Reddit + News
      if (summarizedSections) {
        message += `${summarizedSections}\n`;
      }

      // Footer
      message += '\n🌐 _Stay updated with trends & world news_';

      // Send combined message
      if (trendsLine || summarizedSections) {
        console.log('Sending message to the channel');
        await this.bot.telegram.sendMessage(
          `@${config.telegram.channelUsername}`,
          message,
          {
            parse_mode: 'Markdown',
          }
        );

        logger.info(`Global trends feed sent`);
      }
    } catch (error) {
      logger.error('Error fetching or sending global trends feed:', error);
    }
  }

  listJobs(): string[] {
    return Array.from(this.jobs.keys());
  }
}
