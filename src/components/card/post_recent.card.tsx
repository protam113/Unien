'use client';

import { BlogList } from '@/lib/responses/blogLib';
import Link from 'next/link';
import React from 'react';
import NoResultsFound from '../design/NoResultsFound';

export const PostRecent = ({ category }: { category?: string }) => {
  // Tạo params nếu có category
  const params = category
    ? { category, limit: 5 }
    : { limit: 5, status: ['show', 'popular'].join(',') };

  const { blogs = [], isLoading, isError } = BlogList(1, params, 0);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state
  if (isError || blogs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <NoResultsFound />
      </div>
    );
  }

  return (
    <ul>
      {blogs.slice(0, 5).map((relatedPost, index) => (
        <li key={index} className="mb-4">
          <Link href={`/blogs/${relatedPost.slug}`}>
            <p className="text-16 border-b-2 pb-2 line-clamp-3 text-gray-700 transform transition-transform duration-300 hover:text-main">
              {relatedPost.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
