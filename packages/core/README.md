# @sushi-pub/core

Core utilities and types shared across all SushiPub UI Framework packages.

## Installation

```bash
npm install @sushi-pub/core
```

## Features

- **Logger**: Consistent logging utility
- **Configuration Management**: Utilities for merging and managing configs
- **Type Definitions**: Common TypeScript interfaces and types
- **Utilities**: Helper functions for common tasks

## Usage

### Logger

```typescript
import { Logger } from '@sushi-pub/core';

const logger = new Logger('MyApp');

logger.log('Application started');
logger.error('An error occurred', error);
logger.warn('Warning message');
logger.info('Info message');
```

### Configuration Management

```typescript
import { mergeConfig } from '@sushi-pub/core';

const defaults = {
  timeout: 5000,
  retries: 3,
};

const custom = {
  timeout: 10000,
};

const config = mergeConfig(defaults, custom);
// Result: { timeout: 10000, retries: 3 }
```

### Type Definitions

```typescript
import { Config, ApiResponse, RequestConfig } from '@sushi-pub/core';

const config: Config = {
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer token',
  },
};
```

## API

### Logger

- `log(message: string, ...args: any[]): void`
- `error(message: string, ...args: any[]): void`
- `warn(message: string, ...args: any[]): void`
- `info(message: string, ...args: any[]): void`

### Utilities

- `mergeConfig<T>(defaults: T, custom: Partial<T>): T`
- `safeJsonParse<T>(json: string, fallback: T): T`

### Types

- `Config`: Base configuration interface
- `ApiResponse<T>`: API response structure
- `RequestConfig`: Extended request configuration
- `CacheConfig`: Cache configuration
- `HttpMethod`: HTTP method types

## License

MIT
