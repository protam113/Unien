'use client';

import Link from 'next/link';
import React from 'react';
import NoResultsFound from '../design/NoResultsFound';
import { ServiceList } from '@/lib';
import { LoadingSpin } from '../loading/loading';

export const ServiceRecent = ({ category }: { category?: string }) => {
  const params = category
    ? { category, limit: 5 }
    : { limit: 5, status: ['show', 'popular'].join(',') };

  const { services, isLoading, isError } = ServiceList(1, params, 0);

  if (isLoading) {
    return <LoadingSpin />;
  }

  // Error state
  if (isError || services.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <NoResultsFound />
      </div>
    );
  }

  return (
    <ul>
      {services.map((relatedPost, index) => (
        <li key={index} className="mb-4">
          <Link href={`/services/${relatedPost.slug}`}>
            <p className="text-16 border-b-2 pb-2 line-clamp-3 text-gray-700 transform transition-transform duration-300 hover:text-main">
              {relatedPost.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
