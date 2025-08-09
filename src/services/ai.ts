import axios from 'axios';
import config from '../config';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function summarizeHeadlines(
  redditSection: string,
  newsSection: string
): Promise<string> {
  const apiKey = config.openrouter.apiKey;
  if (!apiKey) throw new Error('Missing OpenRouter API key');

  const systemPrompt = `
You summarize news.

Given 8 Reddit + 8 World News headlines:

- Pick top 5 from each.
- Rewrite in max 6 words per headline.
- Output: two titled sections, 1-5 each.
- Use titles: '📱 *REDDIT TRENDING*', '🌍 *WORLD NEWS*'
`.trim();

  const userPrompt = `
Reddit Headlines:
${redditSection.trim()}

World News Headlines:
${newsSection.trim()}
`.trim();

  console.log(`User prompt sent to OpenRouter AI`);
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          // Optional:
          // 'HTTP-Referer': 'https://your-site.com',
          // 'X-Title': 'Your Site Title',
        },
      }
    );
    console.log(`Response received from OpenRouter AI`);

    return response.data.choices?.[0]?.message?.content?.trim() || '';
  } catch (error: any) {
    console.error(
      'OpenRouter API Error:',
      error.response?.data || error.message
    );
    throw new Error('Failed to summarize headlines');
  }
}
