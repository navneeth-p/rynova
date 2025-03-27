import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

// Initialize Sentry
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

export const logError = (error: Error | unknown, context?: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);
    if (context) {
      console.error('Context:', context);
    }
  } else {
    Sentry.captureException(error, {
      extra: context,
    });
  }
};

export const logInfo = (message: string, context?: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Info:', message);
    if (context) {
      console.log('Context:', context);
    }
  } else {
    Sentry.captureMessage(message, {
      level: 'info',
      extra: context,
    });
  }
};

export const logWarning = (message: string, context?: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Warning:', message);
    if (context) {
      console.warn('Context:', context);
    }
  } else {
    Sentry.captureMessage(message, {
      level: 'warning',
      extra: context,
    });
  }
};

export const formatError = (error: Error): string => {
  return `${error.name}: ${error.message}\n${error.stack || ''}`;
};

export default {
  logError,
  logInfo,
  logWarning,
  formatError
}; 