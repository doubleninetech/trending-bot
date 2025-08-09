import puppeteer, { Browser, Page } from 'puppeteer';
import config from '../config';

const TRENDS_URL = 'https://trends.google.com/trending?geo=US';

export class TrendsService {
  private browser: Browser | null = null;

  constructor() {}

  private async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--no-first-run',
          '--single-process',
          '--disable-gpu',
        ],
      });
    }
    return this.browser;
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async fetchTrends(limit = 10): Promise<string | null> {
    let page: Page | null = null;

    try {
      const browser = await this.getBrowser();
      page = await browser.newPage();

      await page.setUserAgent(
        `${config.telegram.channelUsername || 'hot-bot'}-bot/1.0`
      );
      await page.setViewport({ width: 1920, height: 1080 });
      await page.goto(TRENDS_URL, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      console.log(`Fetching Google trends...`);

      // Wait for content
      await page.waitForSelector('body', { timeout: 10000 });
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Extract page text and parse for trends
      const pageText = await page.evaluate(() => {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        return document.body.innerText;
      });

      // Generate a string of trend titles with numbers, separated by ' • '
      let trendsLine = '';
      const lines = pageText.split('\n').map((line: string) => line.trim());
      const titles: string[] = [];
      for (let i = 0; i < lines.length - 1; i++) {
        const current = lines[i];
        const next = lines[i + 1];
        if (
          current.length > 2 &&
          current.length < 100 &&
          /^[A-Za-z0-9\-\s']+$/.test(current) &&
          /^[0-9,]+K?\+$/.test(next)
        ) {
          // Only include if next (the count) is 50K+ or more
          const match = next.match(/([0-9,]+)K?\+/);
          if (match) {
            // Remove commas and parse number
            const num = parseInt(match[1].replace(/,/g, ''), 10);
            if (num >= 50) {
              titles.push(`${current} ${next}`);
            }
          }
        }
      }
      trendsLine = titles.slice(0, limit).join(' • ');

      // Return a TrendsResponse-compatible object, using trendsLine as trends (string[])
      return trendsLine;
    } catch (error: any) {
      console.error('Trends scraping error:', error.message);
      return null;
    } finally {
      if (page) {
        await page.close();
      }
    }
  }

  async fetchTrendsFeed(): Promise<string | null> {
    return this.fetchTrends();
  }
}
