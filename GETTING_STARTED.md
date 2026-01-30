# SushiPub UI Framework - Getting Started

Welcome to the SushiPub UI Framework! This guide will help you get started with all the packages.

## Quick Start

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SushiPub/sushi_pub_ui.git
cd sushi_pub_ui
```

2. Install dependencies:
```bash
npm install
```

3. Build all packages:
```bash
npm run build
```

### Running Demos

Run the included demos to see the framework in action:

```bash
# Core utilities demo
npm run demo:core

# Sitemap generation demo
npm run demo:sitemap
```

## Package Overview

### 🔧 @sushi-pub/core
Core utilities and types shared across all packages.

**Key Features:**
- Logger utility
- Configuration management
- Common TypeScript types

**Quick Example:**
```typescript
import { Logger, mergeConfig } from '@sushi-pub/core';

const logger = new Logger('MyApp');
logger.log('Application started');
```

[Full Documentation](./packages/core/README.md)

---

### 📡 @sushi-pub/data-fetching
Data fetching with caching and React hooks.

**Key Features:**
- `useFetch` hook for GET requests
- `useMutation` hook for POST/PUT/DELETE
- Built-in caching with TTL
- Loading and error states

**Quick Example:**
```typescript
import { useFetch } from '@sushi-pub/data-fetching';

function UserList() {
  const { data, loading, error } = useFetch('/api/users', {
    cache: { enabled: true, ttl: 60000 }
  });
  
  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

[Full Documentation](./packages/data-fetching/README.md)

---

### 🎯 @sushi-pub/seo
SEO optimization with meta tags and structured data.

**Key Features:**
- React components for SEO
- Open Graph support
- Twitter Cards support
- JSON-LD structured data
- Dynamic meta tag management

**Quick Example:**
```typescript
import { SEO, StructuredData } from '@sushi-pub/seo';

function ProductPage() {
  return (
    <>
      <SEO
        title="My Product"
        description="Amazing product"
        ogImage="https://example.com/product.jpg"
      />
      <StructuredData data={{ '@type': 'Product', name: 'My Product' }} />
      {/* Page content */}
    </>
  );
}
```

[Full Documentation](./packages/seo/README.md)

---

### 🗺️ @sushi-pub/sitemap-generation
Dynamic sitemap generation for SEO.

**Key Features:**
- Generate XML sitemaps
- Sitemap index support
- URL validation
- Priority and change frequency

**Quick Example:**
```typescript
import { generateSitemap, createSitemapUrl } from '@sushi-pub/sitemap-generation';

const sitemap = generateSitemap({
  hostname: 'https://example.com',
  urls: [
    createSitemapUrl('/', { priority: 1.0, changefreq: 'daily' }),
    createSitemapUrl('/about', { priority: 0.8, changefreq: 'weekly' }),
  ],
});

console.log(sitemap); // XML sitemap string
```

[Full Documentation](./packages/sitemap-generation/README.md)

---

### 🤖 @sushi-pub/builder-ai
AI-powered website building utilities.

**Key Features:**
- AI component generation
- Page structure generation
- Component library
- React hooks for AI operations
- Component optimization

**Quick Example:**
```typescript
import { useAIPageGenerator } from '@sushi-pub/builder-ai';

function WebsiteBuilder() {
  const { page, loading, generate } = useAIPageGenerator();
  
  const handleGenerate = async () => {
    await generate('Create a landing page for a SaaS product');
  };
  
  return (
    <button onClick={handleGenerate} disabled={loading}>
      Generate Page
    </button>
  );
}
```

[Full Documentation](./packages/builder-ai/README.md)

---

## Real-World Use Cases

### 1. E-commerce Website
```typescript
// Product listing with caching
const { data: products } = useFetch('/api/products', {
  cache: { enabled: true, ttl: 300000 }
});

// SEO for product page
<SEO
  title={`${product.name} - Buy Now`}
  ogType="product"
  ogImage={product.image}
/>

// Generate sitemap for all products
const sitemap = generateSitemap({
  hostname: 'https://mystore.com',
  urls: products.map(p => createSitemapUrl(`/products/${p.id}`))
});
```

### 2. Blog Platform
```typescript
// Fetch blog posts
const { data: posts } = useFetch('/api/posts');

// SEO for blog post
<SEO
  title={post.title}
  description={post.excerpt}
  ogType="article"
/>

<StructuredData
  data={{
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
  }}
/>

// Generate blog sitemap
const sitemap = generateSitemap({
  hostname: 'https://myblog.com',
  urls: posts.map(p => createSitemapUrl(
    `/blog/${p.slug}`,
    { changefreq: 'monthly', priority: 0.7 }
  ))
});
```

### 3. AI-Powered Website Builder
```typescript
// Generate page structure from user input
const { page, generate } = useAIPageGenerator();

await generate('Create a pricing page with 3 tiers');

// Use generated components
page.components.forEach(component => {
  console.log(`Component: ${component.name}`);
  console.log(`Props:`, component.props);
});
```

## Project Structure

```
sushi_pub_ui/
├── packages/
│   ├── core/                 # Core utilities
│   ├── data-fetching/        # Data fetching
│   ├── seo/                  # SEO utilities
│   ├── sitemap-generation/   # Sitemap generation
│   └── builder-ai/           # AI builder
├── examples/                 # Example code
├── demo/                     # Demo scripts
├── package.json              # Root package config
└── README.md                 # Main documentation
```

## Development

### Building
```bash
npm run build
```

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Next Steps

1. Read the [main README](./README.md) for detailed information
2. Check out the [examples](./examples/) folder for complete examples
3. Read individual package documentation in each package's README
4. Run the demo scripts to see the packages in action

## Support

- GitHub Issues: [Report bugs or request features](https://github.com/SushiPub/sushi_pub_ui/issues)
- Documentation: Check each package's README for detailed API documentation

## License

MIT License - See [LICENSE](./LICENSE) for details
