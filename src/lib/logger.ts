/**
 * Simple logger utility for application-wide logging
 * Provides different log levels and consistent formatting
 */

// Log levels in order of severity
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

// const currentLogLevel =
//   process.env.NODE_ENV === 'production'
//     ? LogLevel.INFO
//     : LogLevel.DEBUG;

// Current log level - can be set via environment variable
const currentLogLevel = LogLevel.DEBUG;

/**
 * Format a log message with timestamp and level
 */
const formatLogMessage = (level: string, message: string): string => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
};

/**
 * Logger utility with different log levels
 */
export const logger = {
  debug: (message: string): void => {
    if (currentLogLevel <= LogLevel.DEBUG) {
      console.debug(formatLogMessage("DEBUG", message));
    }
  },

  info: (message: string): void => {
    if (currentLogLevel <= LogLevel.INFO) {
      console.info(formatLogMessage("INFO", message));
    }
  },

  warn: (message: string): void => {
    if (currentLogLevel <= LogLevel.WARN) {
      console.warn(formatLogMessage("WARN", message));
    }
  },

  error: (message: string, error?: Error): void => {
    if (currentLogLevel <= LogLevel.ERROR) {
      console.error(formatLogMessage("ERROR", message));
      if (error) {
        console.error(error);
      }
    }
  },
};
