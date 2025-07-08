'use client';

import { BlogList } from '@/lib';
import Link from 'next/link';
import { NoResultsFound } from '../design/NoResultsFound';
import { LoadingSpin } from '../loading/loading';

export const PostRecent = ({ category }: { category?: string }) => {
  // Tạo params nếu có category
  const params = category
    ? { category, limit: 5 }
    : { limit: 5, status: ['show', 'popular'].join(',') };

  const { blogs, isLoading, isError } = BlogList(1, params, 0);

  // Loading state
  if (isLoading) {
    return <LoadingSpin />;
  }

  // Error state
  if (isError || blogs.length === 0) {
    return <NoResultsFound />;
  }

  return (
    <ul>
      {blogs.map((relatedPost, index) => (
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
