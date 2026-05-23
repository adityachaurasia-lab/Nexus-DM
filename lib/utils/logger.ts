type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_COLORS: Record<LogLevel, string> = {
  debug: '\x1b[36m',
  info: '\x1b[32m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
};

const RESET = '\x1b[0m';

function log(level: LogLevel, module: string, message: string, data?: unknown) {
  const timestamp = new Date().toISOString();
  const color = LOG_COLORS[level];
  const prefix = `${color}[${level.toUpperCase()}]${RESET} [${timestamp}] [${module}]`;

  if (data) {
    console[level](`${prefix} ${message}`, data);
  } else {
    console[level](`${prefix} ${message}`);
  }
}

export function createLogger(module: string) {
  return {
    debug: (msg: string, data?: unknown) => log('debug', module, msg, data),
    info: (msg: string, data?: unknown) => log('info', module, msg, data),
    warn: (msg: string, data?: unknown) => log('warn', module, msg, data),
    error: (msg: string, data?: unknown) => log('error', module, msg, data),
  };
}
