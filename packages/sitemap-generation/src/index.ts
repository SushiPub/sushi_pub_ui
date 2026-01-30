import { Logger } from '@sushi-pub/core';

const logger = new Logger('SitemapGeneration');

/**
 * Sitemap URL entry
 */
export interface SitemapUrl {
  loc: string; // URL of the page
  lastmod?: string; // Last modification date (ISO 8601 format)
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number; // Priority (0.0 to 1.0)
}

/**
 * Sitemap configuration
 */
export interface SitemapConfig {
  hostname: string;
  urls: SitemapUrl[];
  xmlns?: string;
}

/**
 * Generate XML sitemap from URLs
 */
export function generateSitemap(config: SitemapConfig): string {
  const xmlns = config.xmlns || 'http://www.sitemaps.org/schemas/sitemap/0.9';

  const urlEntries = config.urls
    .map((url) => {
      const loc = url.loc.startsWith('http') ? url.loc : `${config.hostname}${url.loc}`;
      
      let entry = `  <url>\n    <loc>${escapeXml(loc)}</loc>\n`;

      if (url.lastmod) {
        entry += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }

      if (url.changefreq) {
        entry += `    <changefreq>${url.changefreq}</changefreq>\n`;
      }

      if (url.priority !== undefined) {
        entry += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
      }

      entry += '  </url>';
      return entry;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="${xmlns}">
${urlEntries}
</urlset>`;

  logger.log(`Generated sitemap with ${config.urls.length} URLs`);
  return sitemap;
}

/**
 * Escape special XML characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate a sitemap index (for large sites with multiple sitemaps)
 */
export interface SitemapIndexEntry {
  loc: string; // URL of the sitemap
  lastmod?: string; // Last modification date
}

export function generateSitemapIndex(entries: SitemapIndexEntry[]): string {
  const xmlns = 'http://www.sitemaps.org/schemas/sitemap/0.9';

  const sitemapEntries = entries
    .map((entry) => {
      let xml = `  <sitemap>\n    <loc>${escapeXml(entry.loc)}</loc>\n`;

      if (entry.lastmod) {
        xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
      }

      xml += '  </sitemap>';
      return xml;
    })
    .join('\n');

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="${xmlns}">
${sitemapEntries}
</sitemapindex>`;

  logger.log(`Generated sitemap index with ${entries.length} sitemaps`);
  return sitemapIndex;
}

/**
 * Create a sitemap URL entry with defaults
 */
export function createSitemapUrl(
  loc: string,
  options?: Partial<Omit<SitemapUrl, 'loc'>>
): SitemapUrl {
  return {
    loc,
    lastmod: options?.lastmod || new Date().toISOString(),
    changefreq: options?.changefreq || 'weekly',
    priority: options?.priority !== undefined ? options.priority : 0.5,
  };
}

/**
 * Validate sitemap URLs
 */
export function validateSitemapUrls(urls: SitemapUrl[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  urls.forEach((url, index) => {
    if (!url.loc) {
      errors.push(`URL at index ${index} is missing 'loc' field`);
    }

    if (url.priority !== undefined && (url.priority < 0 || url.priority > 1)) {
      errors.push(`URL at index ${index} has invalid priority: ${url.priority} (must be 0.0-1.0)`);
    }

    if (url.lastmod && isNaN(Date.parse(url.lastmod))) {
      errors.push(`URL at index ${index} has invalid lastmod date: ${url.lastmod}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

export default {
  generateSitemap,
  generateSitemapIndex,
  createSitemapUrl,
  validateSitemapUrls,
};
