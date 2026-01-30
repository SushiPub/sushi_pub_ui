#!/usr/bin/env node

/**
 * Demo script to showcase the core utilities
 */

import { Logger, mergeConfig, safeJsonParse } from '../packages/core/dist/index.js';

console.log('=== SushiPub UI Framework - Core Utilities Demo ===\n');

// Demo 1: Logger
console.log('1. Logger Demo\n');
const logger = new Logger('Demo');
logger.log('This is a log message');
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
console.log('\n' + '='.repeat(80) + '\n');

// Demo 2: Config Merging
console.log('2. Configuration Merging Demo\n');
const defaultConfig = {
  timeout: 5000,
  retries: 3,
  baseUrl: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
};

const customConfig = {
  timeout: 10000,
  headers: {
    'Authorization': 'Bearer token',
  },
};

const mergedConfig = mergeConfig(defaultConfig, customConfig);
console.log('Default Config:', JSON.stringify(defaultConfig, null, 2));
console.log('\nCustom Config:', JSON.stringify(customConfig, null, 2));
console.log('\nMerged Config:', JSON.stringify(mergedConfig, null, 2));
console.log('\n' + '='.repeat(80) + '\n');

// Demo 3: Safe JSON Parsing
console.log('3. Safe JSON Parsing Demo\n');

const validJson = '{"name": "John", "age": 30}';
const invalidJson = '{invalid json}';
const fallbackData = { name: 'Default', age: 0 };

console.log('Valid JSON:');
const parsedValid = safeJsonParse(validJson, fallbackData);
console.log('  Input:', validJson);
console.log('  Result:', parsedValid);

console.log('\nInvalid JSON:');
const parsedInvalid = safeJsonParse(invalidJson, fallbackData);
console.log('  Input:', invalidJson);
console.log('  Result (fallback):', parsedInvalid);

console.log('\n=== Demo Complete ===\n');
