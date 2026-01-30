# SushiPub UI Framework

A comprehensive UI framework with packages for data fetching, SEO, sitemap generation, and AI-powered website building.

## 📦 Packages

### [@sushi-pub/core](./packages/core)
Core utilities and types shared across all packages.

**Features:**
- Logger utility for consistent logging
- Configuration management utilities
- Common TypeScript types and interfaces

### [@sushi-pub/data-fetching](./packages/data-fetching)
Data fetching utilities with caching and React hooks.

**Features:**
- `fetchData()` - Async data fetching with caching support
- `useFetch()` - React hook for data fetching with loading and error states
- `useMutation()` - React hook for mutations (POST, PUT, DELETE)
- Built-in caching mechanism with TTL support
- TypeScript support

**Example:**
```typescript
import { useFetch, useMutation } from '@sushi-pub/data-fetching';

function MyComponent() {
  const { data, loading, error, refetch } = useFetch('/api/users', {
    cache: { enabled: true, ttl: 60000 } // Cache for 1 minute
  });

  const { mutate } = useMutation('/api/users');

  const handleCreate = async () => {
    await mutate({ name: 'John Doe' }, 'POST');
    refetch();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

### [@sushi-pub/seo](./packages/seo)
SEO utilities and React components for meta tags, Open Graph, and Twitter Cards.

**Features:**
- `<SEO />` - React component for managing meta tags
- `<StructuredData />` - Component for JSON-LD structured data
- `updateMetaTags()` - Programmatic meta tag management
- Support for Open Graph and Twitter Cards
- Automatic canonical URL management

**Example:**
```typescript
import { SEO, StructuredData } from '@sushi-pub/seo';

function MyPage() {
  return (
    <>
      <SEO
        title="My Amazing Page"
        description="This is an amazing page built with SushiPub"
        keywords={['ui-framework', 'seo', 'react']}
        ogImage="https://example.com/image.jpg"
        twitterCard="summary_large_image"
      />
      <StructuredData
        data={{
          '@type': 'WebPage',
          name: 'My Amazing Page',
          description: 'This is an amazing page',
        }}
      />
      <h1>Welcome!</h1>
    </>
  );
}
```

### [@sushi-pub/sitemap-generation](./packages/sitemap-generation)
Dynamic sitemap generation utilities.

**Features:**
- `generateSitemap()` - Create XML sitemaps
- `generateSitemapIndex()` - Create sitemap indexes for large sites
- `createSitemapUrl()` - Helper for creating sitemap entries
- `validateSitemapUrls()` - Validate sitemap configuration
- Full XML sitemap specification support

**Example:**
```typescript
import { generateSitemap, createSitemapUrl } from '@sushi-pub/sitemap-generation';

const sitemap = generateSitemap({
  hostname: 'https://example.com',
  urls: [
    createSitemapUrl('/', { priority: 1.0, changefreq: 'daily' }),
    createSitemapUrl('/about', { priority: 0.8, changefreq: 'weekly' }),
    createSitemapUrl('/blog', { priority: 0.9, changefreq: 'daily' }),
  ],
});

// Write to file or serve dynamically
console.log(sitemap);
```

### [@sushi-pub/builder-ai](./packages/builder-ai)
AI-powered website building utilities.

**Features:**
- `generateComponentSuggestions()` - AI-powered component generation
- `generatePageStructure()` - Generate full page structures from descriptions
- `useAIComponentGenerator()` - React hook for component generation
- `useAIPageGenerator()` - React hook for page generation
- Component library with pre-built templates

**Example:**
```typescript
import { useAIPageGenerator, useAIComponentGenerator } from '@sushi-pub/builder-ai';

function WebsiteBuilder() {
  const { page, loading, generate } = useAIPageGenerator();

  const handleGenerate = async () => {
    await generate('Create a landing page for a SaaS product with hero, features, and pricing sections');
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Page'}
      </button>
      {page && (
        <div>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
          {page.components.map(comp => (
            <div key={comp.id}>
              <h3>{comp.name}</h3>
              <p>{comp.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## 🚀 Installation

Install all packages:

```bash
npm install
```

Install specific packages:

```bash
npm install @sushi-pub/data-fetching
npm install @sushi-pub/seo
npm install @sushi-pub/sitemap-generation
npm install @sushi-pub/builder-ai
```

## 🛠️ Development

Build all packages:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Run linting:

```bash
npm run lint
```

## 📁 Project Structure

```
sushi_pub_ui/
├── packages/
│   ├── core/                 # Core utilities
│   ├── data-fetching/        # Data fetching utilities
│   ├── seo/                  # SEO utilities
│   ├── sitemap-generation/   # Sitemap generation
│   └── builder-ai/           # AI-powered builder
├── package.json              # Root package configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🎯 Use Cases

1. **E-commerce Website**: Use data-fetching for product catalogs, SEO for product pages, and sitemap generation for all products
2. **Blog Platform**: Use data-fetching for posts, SEO for articles, sitemap for blog posts, and builder-ai for quick page creation
3. **Corporate Website**: Use all packages together to build a complete, SEO-optimized website with AI-powered content suggestions
4. **SaaS Landing Page**: Use builder-ai to quickly generate landing page layouts, SEO for optimization, and data-fetching for form submissions

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue in the GitHub repository.