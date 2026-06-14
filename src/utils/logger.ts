// ============================================
// LOGGER UTILITY
// Respects environment debug flags
// Silences logs in production automatically
// ============================================

import config from '../config/environment';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

const formatTimestamp = (): string =>
  new Date().toISOString();

const shouldLog = (level: LogLevel): boolean => {
  if (config.isProduction) {
    // Only log errors in production
    return level === 'error';
  }
  if (!config.features.enableDebugLogs && level === 'debug') {
    return false;
  }
  return true;
};

const createEntry = (
  level: LogLevel,
  message: string,
  data?: unknown
): LogEntry => ({
  level,
  message,
  timestamp: formatTimestamp(),
  data,
});

const logger = {
  info: (message: string, data?: unknown): void => {
    if (!shouldLog('info')) return;
    const entry = createEntry('info', message, data);
    console.info(`ℹ️  [${entry.timestamp}] ${message}`, data ?? '');
  },

  warn: (message: string, data?: unknown): void => {
    if (!shouldLog('warn')) return;
    const entry = createEntry('warn', message, data);
    console.warn(`⚠️  [${entry.timestamp}] ${message}`, data ?? '');
  },

  error: (message: string, data?: unknown): void => {
    if (!shouldLog('error')) return;
    const entry = createEntry('error', message, data);
    console.error(`❌ [${entry.timestamp}] ${message}`, data ?? '');
  },

  debug: (message: string, data?: unknown): void => {
    if (!shouldLog('debug')) return;
    const entry = createEntry('debug', message, data);
    console.debug(`🐛 [${entry.timestamp}] ${message}`, data ?? '');
  },
};

export default logger;