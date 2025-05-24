/**
 * Simple logger utility for the dev-blog app
 * Provides consistent logging with prefixes and styling
 */
export const logger = {
  info: (message: string, ...args: any[]) => {
    console.info(`%c[INFO] ${message}`, 'color: #3b82f6', ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`%c[WARN] ${message}`, 'color: #f59e0b', ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`%c[ERROR] ${message}`, 'color: #ef4444', ...args);
  },
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`%c[DEBUG] ${message}`, 'color: #10b981', ...args);
    }
  },
  log: (message: string, ...args: any[]) => {
    console.log(`%c[LOG] ${message}`, 'color: #6b7280', ...args);
  }
};
