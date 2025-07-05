'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PageMetadata } from '@/constant/appInfos';
import { SEOProps } from '@/types';

export function SEO({ title, description }: SEOProps) {
  const pathname = usePathname();
  const metadata = PageMetadata(title, description);

  useEffect(() => {
    document.title = metadata.title as string;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', metadata.description as string);
  }, [metadata, pathname]);

  return null;
}
