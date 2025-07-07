'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SEOProps } from '@/types';
import { PageMetadata, siteBaseUrl } from '@/constant/appInfos';

export function SEO({ title, description, image }: SEOProps) {
  const pathname = usePathname();
  const metadata = PageMetadata(title, description);
  const fullUrl = `${siteBaseUrl}${pathname}`;

  useEffect(() => {
    // Set document title
    document.title = metadata.title as string;

    // Update description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', metadata.description as string);
    } else {
      const tag = document.createElement('meta');
      tag.name = 'description';
      tag.content = metadata.description as string;
      document.head.appendChild(tag);
    }

    // Canonical
    const canonical =
      document.querySelector('link[rel="canonical"]') ||
      document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', fullUrl);
    document.head.appendChild(canonical);

    // Robots
    const robots =
      document.querySelector('meta[name="robots"]') ||
      document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'index, follow');
    document.head.appendChild(robots);

    // Open Graph
    const ogTags = [
      { property: 'og:title', content: metadata.title },
      { property: 'og:description', content: metadata.description },
      { property: 'og:url', content: fullUrl },
      {
        property: 'og:image',
        content: image || `${siteBaseUrl}/default-og.jpg`,
      },
      { property: 'og:type', content: 'website' },
    ];

    ogTags.forEach(({ property, content }) => {
      const existing = document.querySelector(`meta[property="${property}"]`);
      if (existing) {
        existing.setAttribute('content', content as string);
      } else {
        const tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content as string);
        document.head.appendChild(tag);
      }
    });

    // Twitter Card
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: metadata.title },
      { name: 'twitter:description', content: metadata.description },
      {
        name: 'twitter:image',
        content: image || `${siteBaseUrl}/default-og.jpg`,
      },
    ];

    twitterTags.forEach(({ name, content }) => {
      const existing = document.querySelector(`meta[name="${name}"]`);
      if (existing) {
        existing.setAttribute('content', content as string);
      } else {
        const tag = document.createElement('meta');
        tag.setAttribute('name', name);
        tag.setAttribute('content', content as string);
        document.head.appendChild(tag);
      }
    });

    // Structured Data (JSON-LD)
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: metadata.title,
      description: metadata.description,
      url: fullUrl,
      image: image || `${siteBaseUrl}/default-og.jpg`,
    };

    const scriptId = 'structured-data-seo';
    let scriptTag = document.getElementById(
      scriptId
    ) as HTMLScriptElement | null;
    if (scriptTag) {
      scriptTag.innerHTML = JSON.stringify(jsonLd);
    } else {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      scriptTag.innerHTML = JSON.stringify(jsonLd);
      document.head.appendChild(scriptTag);
    }
  }, [metadata, pathname]);

  return null;
}
