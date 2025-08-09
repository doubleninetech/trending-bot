import winston from 'winston';

// Convert maxSize string to number (e.g., "10m" -> 10485760)
function parseMaxSize(size: string | number): number {
  if (typeof size === 'number') return size;

  const sizeStr = size.toLowerCase();
  const num = parseInt(sizeStr, 10);

  if (sizeStr.includes('k')) return num * 1024;
  if (sizeStr.includes('m')) return num * 1024 * 1024;
  if (sizeStr.includes('g')) return num * 1024 * 1024 * 1024;

  return num || 10485760; // Default to 10MB
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'hot-bot' },
  transports: [
    // Write errors to error.log
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      maxsize: parseMaxSize('10m'),
      maxFiles: 5,
    }),
    // Write all logs to combined.log
    new winston.transports.File({
      filename: 'combined.log',
      maxsize: parseMaxSize('10m'),
      maxFiles: 5,
    }),
  ],
});

export default logger;
