'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ServiceList } from '@/lib/responses/serviceLib';
import { LoadingSpin, ErrorLoading } from '@/components';
import { PostCard } from '@/components';

export function ServiceListData({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) {
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const params = {
    category: selectedCategory ?? undefined,
    limit: 10,
    status: ['show', 'popular'].join(','),
  };

  const { services, isLoading, isError, pagination } = ServiceList(
    currentPage,
    params,
    0
  );

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      if (nextPage > 0 && nextPage <= pagination.total_page) {
        setCurrentPage(nextPage);
      }
      setLoading(false);
      setAllLoaded(true);
    }, 1500);
  };

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((post) => (
          <PostCard
            type="service"
            key={post._id}
            _id={post._id}
            title={post.title}
            slug={post.slug}
            content={post.content}
            file={post.file}
          />
        ))}
      </div>

      {/* Load More Button */}
      {!allLoaded && pagination.total_page > 1 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-8 py-3 rounded-full bg-gray-900 text-white font-medium transition-all duration-300
                     hover:bg-orange-500 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50
                     disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                LOADING...
              </span>
            ) : (
              'TẢI THÊM'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
