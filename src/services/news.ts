import Parser from 'rss-parser';
import config from '../config';

// News RSS feed URLs from different sources
const NEWS_RSS_URLS = {
  reuters: 'https://www.reutersagency.com/feed/?best-topics=top-news',
  bbc: 'http://feeds.bbci.co.uk/news/world/rss.xml',
  cnn: 'http://rss.cnn.com/rss/edition.rss',
  aljazeera: 'https://www.aljazeera.com/xml/rss/all.xml',
} as const;

export class NewsService {
  private rssParser: Parser;

  constructor() {
    this.rssParser = new Parser({
      headers: {
        'User-Agent': config.telegram.channelUsername || 'hot-bot/1.0',
      },
    });
  }

  // Fetch news with limit
  async fetchNews(
    source: keyof typeof NEWS_RSS_URLS = 'bbc',
    limit = 10
  ): Promise<{ [key: string]: string } | null> {
    const url = NEWS_RSS_URLS[source];
    console.log(`Fetching ${source} news...`);

    try {
      const feed = await this.rssParser.parseURL(url);

      // Limit the number of items returned
      if (feed.items && limit > 0) {
        feed.items = feed.items.slice(0, limit);
      }

      return feed;
    } catch (error: any) {
      console.error('News error:', error.message);
      return null;
    }
  }
}
