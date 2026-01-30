#!/usr/bin/env node

/**
 * Demo script to showcase the sitemap generation functionality
 */

import { generateSitemap, createSitemapUrl, validateSitemapUrls } from '../packages/sitemap-generation/dist/index.js';

console.log('=== SushiPub UI Framework - Sitemap Generation Demo ===\n');

// Demo 1: Basic sitemap generation
console.log('1. Generating basic sitemap...\n');

const pages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/products', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog', priority: 0.9, changefreq: 'daily' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
];

const sitemap = generateSitemap({
  hostname: 'https://example.com',
  urls: pages.map(page =>
    createSitemapUrl(page.path, {
      priority: page.priority,
      changefreq: page.changefreq,
    })
  ),
});

console.log('Generated Sitemap:\n');
console.log(sitemap);
console.log('\n' + '='.repeat(80) + '\n');

// Demo 2: URL validation
console.log('2. Validating sitemap URLs...\n');

const testUrls = [
  { loc: '/', priority: 1.0 },
  { loc: '/about', priority: 0.8 },
  { loc: '/invalid', priority: 1.5 }, // Invalid priority
];

const validation = validateSitemapUrls(testUrls);

if (validation.valid) {
  console.log('✅ All URLs are valid!\n');
} else {
  console.log('❌ Validation failed:');
  validation.errors.forEach(err => console.log(`  - ${err}`));
  console.log();
}

console.log('='.repeat(80) + '\n');

// Demo 3: Statistics
console.log('3. Statistics:\n');
console.log(`  Total pages in sitemap: ${pages.length}`);
console.log(`  Sitemap size: ${sitemap.length} bytes`);
console.log(`  High priority pages (>= 0.9): ${pages.filter(p => p.priority >= 0.9).length}`);
console.log(`  Daily update pages: ${pages.filter(p => p.changefreq === 'daily').length}`);

console.log('\n=== Demo Complete ===\n');
