import React, { useEffect } from 'react';
import { Logger } from '@sushi-pub/core';

const logger = new Logger('SEO');

/**
 * SEO Meta Tags Configuration
 */
export interface SeoConfig {
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

/**
 * Update document meta tags
 * Note: This function is browser-only and will not work in server-side rendering (SSR) environments
 */
export function updateMetaTags(config: SeoConfig): void {
  // Guard for SSR environments
  if (typeof document === 'undefined') {
    logger.warn('updateMetaTags called in non-browser environment');
    return;
  }

  // Update title
  if (config.title) {
    document.title = config.title;
  }

  // Update or create meta tags
  const metaTags: Array<{ name?: string; property?: string; content: string }> = [];

  if (config.description) {
    metaTags.push({ name: 'description', content: config.description });
  }

  if (config.keywords && config.keywords.length > 0) {
    metaTags.push({ name: 'keywords', content: config.keywords.join(', ') });
  }

  if (config.author) {
    metaTags.push({ name: 'author', content: config.author });
  }

  if (config.robots) {
    metaTags.push({ name: 'robots', content: config.robots });
  }

  // Open Graph tags
  if (config.ogType) {
    metaTags.push({ property: 'og:type', content: config.ogType });
  }

  if (config.ogTitle) {
    metaTags.push({ property: 'og:title', content: config.ogTitle });
  }

  if (config.ogDescription) {
    metaTags.push({ property: 'og:description', content: config.ogDescription });
  }

  if (config.ogImage) {
    metaTags.push({ property: 'og:image', content: config.ogImage });
  }

  if (config.ogUrl) {
    metaTags.push({ property: 'og:url', content: config.ogUrl });
  }

  // Twitter Card tags
  if (config.twitterCard) {
    metaTags.push({ name: 'twitter:card', content: config.twitterCard });
  }

  if (config.twitterTitle) {
    metaTags.push({ name: 'twitter:title', content: config.twitterTitle });
  }

  if (config.twitterDescription) {
    metaTags.push({ name: 'twitter:description', content: config.twitterDescription });
  }

  if (config.twitterImage) {
    metaTags.push({ name: 'twitter:image', content: config.twitterImage });
  }

  if (config.twitterSite) {
    metaTags.push({ name: 'twitter:site', content: config.twitterSite });
  }

  if (config.twitterCreator) {
    metaTags.push({ name: 'twitter:creator', content: config.twitterCreator });
  }

  // Update or create meta tags in the document
  metaTags.forEach(({ name, property, content }) => {
    const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
    let element = document.querySelector(selector);

    if (!element) {
      element = document.createElement('meta');
      if (name) element.setAttribute('name', name);
      if (property) element.setAttribute('property', property);
      document.head.appendChild(element);
    }

    element.setAttribute('content', content);
  });

  // Update canonical link
  if (config.canonical) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = config.canonical;
  }

  logger.log('Meta tags updated');
}

/**
 * React component for SEO meta tags
 */
export const SEO: React.FC<SeoConfig> = (props) => {
  // Serialize props to avoid dependency issues
  const propsKey = JSON.stringify(props);

  useEffect(() => {
    const parsedProps = JSON.parse(propsKey);
    updateMetaTags(parsedProps);
  }, [propsKey]);

  return null;
};

/**
 * Generate structured data for JSON-LD
 */
export function generateStructuredData(data: any): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    ...data,
  });
}

/**
 * React component for structured data (JSON-LD)
 */
export const StructuredData: React.FC<{ data: any }> = ({ data }) => {
  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: generateStructuredData(data) },
  });
};

export default {
  updateMetaTags,
  SEO,
  generateStructuredData,
  StructuredData,
};
