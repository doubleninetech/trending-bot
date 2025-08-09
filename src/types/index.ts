import { Context } from 'telegraf';

// Extend the Telegraf Context with our custom properties
export interface BotContext extends Context {}

// Configuration interfaces
export interface OpenrouterConfig {
  apiKey: string;
}

export interface TelegramConfig {
  botToken: string;
  channelUsername: string;
}

export interface Config {
  telegram: TelegramConfig;
  openrouter: OpenrouterConfig;
}

// Scheduler interfaces
export interface ScheduledJob {
  name: string;
  cronExpression: string;
  callback: () => void | Promise<void>;
}

// Error types
export interface BotError extends Error {
  code?: string;
  context?: string | number | undefined;
}

// Log entry interface
export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  service?: string;
  userId?: number;
  username?: string;
  [key: string]: string | number | undefined;
}
