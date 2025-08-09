/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { config as dotenvConfig } from 'dotenv';
import { Config } from '../types';

dotenvConfig();

const config: Config = {
  telegram: {
    botToken: process.env.BOT_TOKEN!,
    channelUsername: process.env.CHANNEL_USERNAME!,
  },
  openrouter: {
    apiKey: process.env.OPENROUTER_API_KEY!,
  },
};

// Validate required configuration
const requiredConfig = [
  'telegram.botToken',
  'telegram.channelUsername',
  'openrouter.apiKey',
] as const;

const missingConfig = requiredConfig.filter(key => {
  const keys = key.split('.');
  let value: any = config;
  for (const k of keys) {
    value = value[k];
    if (value === undefined) return true;
  }
  return false;
});

if (missingConfig.length > 0) {
  console.error('Missing required configuration:', missingConfig);
  process.exit(1);
}

export default config;
