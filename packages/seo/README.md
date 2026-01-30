# @sushi-pub/seo

SEO utilities and React components for meta tags, Open Graph, and Twitter Cards.

## Installation

```bash
npm install @sushi-pub/seo
```

## Features

- ✅ React component for SEO meta tags
- ✅ Open Graph support
- ✅ Twitter Cards support
- ✅ Canonical URLs
- ✅ Structured data (JSON-LD)
- ✅ Dynamic meta tag updates
- ✅ TypeScript support

## Usage

### Basic SEO

```typescript
import { SEO } from '@sushi-pub/seo';

function MyPage() {
  return (
    <>
      <SEO
        title="My Amazing Page"
        description="This is an amazing page"
        keywords={['web', 'react', 'seo']}
      />
      <h1>Welcome!</h1>
    </>
  );
}
```

### Open Graph and Twitter Cards

```typescript
import { SEO } from '@sushi-pub/seo';

function ProductPage() {
  return (
    <>
      <SEO
        title="Amazing Product"
        description="Buy our amazing product"
        canonical="https://example.com/products/123"
        ogType="product"
        ogImage="https://example.com/product.jpg"
        ogUrl="https://example.com/products/123"
        twitterCard="summary_large_image"
        twitterImage="https://example.com/product.jpg"
      />
      {/* Page content */}
    </>
  );
}
```

### Structured Data

```typescript
import { StructuredData } from '@sushi-pub/seo';

function ArticlePage() {
  return (
    <>
      <StructuredData
        data={{
          '@type': 'Article',
          headline: 'My Article Title',
          author: {
            '@type': 'Person',
            name: 'John Doe',
          },
          datePublished: '2026-01-30',
        }}
      />
      {/* Article content */}
    </>
  );
}
```

### Programmatic Meta Tag Updates

```typescript
import { updateMetaTags } from '@sushi-pub/seo';

function updateSEO() {
  updateMetaTags({
    title: 'New Page Title',
    description: 'New description',
    ogImage: 'https://example.com/new-image.jpg',
  });
}
```

## API

### SEO Component

```typescript
interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
  robots?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  twitterCreator?: string;
}

<SEO {...seoConfig} />
```

### StructuredData Component

```typescript
<StructuredData data={schemaData} />
```

### updateMetaTags(config: SeoConfig): void

Programmatically update meta tags.

### generateStructuredData(data: any): string

Generate JSON-LD structured data string.

## License

MIT
