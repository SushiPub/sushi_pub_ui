/**
 * Core types and interfaces for SushiPub UI Framework
 */

export interface Config {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface CacheConfig {
  enabled: boolean;
  ttl: number; // time to live in milliseconds
  storage?: 'memory' | 'localStorage' | 'sessionStorage';
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestConfig extends Config {
  method?: HttpMethod;
  body?: any;
  cache?: CacheConfig;
}

/**
 * Logger utility for consistent logging across packages
 */
export class Logger {
  private prefix: string;

  constructor(prefix: string = 'SushiPub') {
    this.prefix = prefix;
  }

  log(message: string, ...args: any[]): void {
    console.log(`[${this.prefix}]`, message, ...args);
  }

  error(message: string, ...args: any[]): void {
    console.error(`[${this.prefix}]`, message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    console.warn(`[${this.prefix}]`, message, ...args);
  }

  info(message: string, ...args: any[]): void {
    console.info(`[${this.prefix}]`, message, ...args);
  }
}

/**
 * Utility function to merge configurations
 */
export function mergeConfig<T extends Record<string, any>>(
  defaults: T,
  custom: Partial<T>
): T {
  return { ...defaults, ...custom };
}

/**
 * Utility function to safely parse JSON
 */
export function safeJsonParse<T = any>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export default {
  Logger,
  mergeConfig,
  safeJsonParse,
};
