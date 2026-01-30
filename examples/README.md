# SushiPub UI Framework Examples

This directory contains comprehensive examples demonstrating how to use all packages in the SushiPub UI Framework.

## Examples Included

### 1. Data Fetching with Caching
Demonstrates the `useFetch` hook with caching enabled, showing how to fetch data from an API and automatically cache results.

### 2. Data Mutation
Shows how to use the `useMutation` hook to perform POST, PUT, DELETE operations with proper loading and error handling.

### 3. SEO Optimization
Complete example of using the `<SEO>` component and `<StructuredData>` component to optimize a product page for search engines.

### 4. Sitemap Generation
Demonstrates how to generate XML sitemaps dynamically from your application's routes.

### 5. AI-Powered Website Builder
Shows how to use the AI builder hooks to generate page structures and components from natural language descriptions.

### 6. Complete Application
A full-featured example that combines all the packages in a single application with navigation between different examples.

## Running the Examples

1. Install dependencies:
```bash
npm install
```

2. Build all packages:
```bash
npm run build
```

3. The examples in `App.tsx` can be integrated into any React application.

## Key Features Demonstrated

- ✅ Data fetching with automatic caching
- ✅ Mutation operations (POST, PUT, DELETE)
- ✅ SEO meta tags and Open Graph
- ✅ Structured data (JSON-LD)
- ✅ Dynamic sitemap generation
- ✅ AI-powered component generation
- ✅ Error handling
- ✅ Loading states
- ✅ TypeScript support

## Notes

- The data fetching examples use placeholder API endpoints. Replace with your actual API URLs.
- The AI builder uses simulated responses. In production, connect to a real AI API endpoint.
- All examples include TypeScript types for better development experience.
