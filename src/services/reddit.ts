// JSON API URLs for different subreddits
const JSON_URLS = {
  worldnews: 'https://www.reddit.com/r/worldnews.json',
  trending: 'https://www.reddit.com/r/trending.json',
  popular: 'https://www.reddit.com/r/popular.json',
} as const;

interface RedditPost {
  title: string;
  url: string;
  permalink: string;
  author: string;
  created_utc: number;
  score: number;
  num_comments: number;
}

interface RedditResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
  };
}

export class RedditService {
  constructor() {}

  private async fetchJson(url: string): Promise<RedditResponse | null> {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          Referer: 'https://www.reddit.com/',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return (await response.json()) as RedditResponse;
    } catch (error: any) {
      console.error('Reddit JSON API error:', error.message);
      return null;
    }
  }

  // Fetch posts from a subreddit using JSON API
  async fetchSubredditPosts(
    subreddit: keyof typeof JSON_URLS = 'worldnews',
    limit = 10
  ): Promise<{ [key: string]: any } | null> {
    const url = `${JSON_URLS[subreddit]}?limit=${limit}`;
    console.log(`Fetching ${subreddit} Reddit posts...`);

    const response = await this.fetchJson(url);
    if (!response) {
      return null;
    }

    // Transform Reddit API response to match RSS parser format
    const items = response.data.children.map((child: { data: RedditPost }) => ({
      title: child.data.title,
      link: child.data.url,
      pubDate: new Date(child.data.created_utc * 1000).toISOString(),
      creator: child.data.author,
      'content:encoded': child.data.title,
      'content:encodedSnippet': child.data.title,
      guid: child.data.permalink,
      categories: [],
      isoDate: new Date(child.data.created_utc * 1000).toISOString(),
    }));

    return { items };
  }
}
