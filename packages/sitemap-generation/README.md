# @sushi-pub/sitemap-generation

Dynamic sitemap generation utilities for the SushiPub UI Framework.

## Installation

```bash
npm install @sushi-pub/sitemap-generation
```

## Features

- ✅ Generate XML sitemaps
- ✅ Sitemap index support for large sites
- ✅ Full sitemap specification support
- ✅ Priority and change frequency
- ✅ URL validation
- ✅ TypeScript support

## Usage

### Basic Sitemap Generation

```typescript
import { generateSitemap, createSitemapUrl } from '@sushi-pub/sitemap-generation';

const sitemap = generateSitemap({
  hostname: 'https://example.com',
  urls: [
    createSitemapUrl('/', { priority: 1.0, changefreq: 'daily' }),
    createSitemapUrl('/about', { priority: 0.8, changefreq: 'weekly' }),
    createSitemapUrl('/products', { priority: 0.9, changefreq: 'daily' }),
  ],
});

console.log(sitemap);
```

### Custom URL Configuration

```typescript
import { generateSitemap } from '@sushi-pub/sitemap-generation';

const sitemap = generateSitemap({
  hostname: 'https://example.com',
  urls: [
    {
      loc: '/',
      lastmod: '2026-01-30',
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      loc: '/blog/post-1',
      lastmod: '2026-01-28',
      changefreq: 'monthly',
      priority: 0.7,
    },
  ],
});
```

### Sitemap Index (for large sites)

```typescript
import { generateSitemapIndex } from '@sushi-pub/sitemap-generation';

const sitemapIndex = generateSitemapIndex([
  {
    loc: 'https://example.com/sitemap-products.xml',
    lastmod: '2026-01-30',
  },
  {
    loc: 'https://example.com/sitemap-blog.xml',
    lastmod: '2026-01-29',
  },
]);

console.log(sitemapIndex);
```

### URL Validation

```typescript
import { validateSitemapUrls } from '@sushi-pub/sitemap-generation';

const urls = [
  { loc: '/', priority: 1.0 },
  { loc: '/about', priority: 0.8 },
];

const validation = validateSitemapUrls(urls);

if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
}
```

### Dynamic Sitemap Generation

```typescript
import { generateSitemap, createSitemapUrl } from '@sushi-pub/sitemap-generation';

async function generateDynamicSitemap() {
  // Fetch pages from your CMS or database
  const pages = await fetchAllPages();
  
  const sitemap = generateSitemap({
    hostname: 'https://example.com',
    urls: pages.map(page => createSitemapUrl(
      page.path,
      {
        lastmod: page.updatedAt,
        changefreq: page.updateFrequency,
        priority: page.priority,
      }
    )),
  });

  return sitemap;
}
```

## API

### generateSitemap(config: SitemapConfig): string

Generate XML sitemap.

```typescript
interface SitemapConfig {
  hostname: string;
  urls: SitemapUrl[];
  xmlns?: string;
}

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number; // 0.0 to 1.0
}
```

### generateSitemapIndex(entries: SitemapIndexEntry[]): string

Generate sitemap index.

```typescript
interface SitemapIndexEntry {
  loc: string;
  lastmod?: string;
}
```

### createSitemapUrl(loc: string, options?: Partial<SitemapUrl>): SitemapUrl

Create a sitemap URL entry with defaults.

### validateSitemapUrls(urls: SitemapUrl[]): ValidationResult

Validate sitemap URLs.

```typescript
interface ValidationResult {
  valid: boolean;
  errors: string[];
}
```

## License

MIT
