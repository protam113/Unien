'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { ServiceList } from '@/lib/responses/serviceLib';

export default function ServiceListData({
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
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-red-500">Error loading service posts</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((post) => (
          <article
            key={post._id}
            className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Link href={post.slug} className="block">
              <div className="relative overflow-hidden group">
                <div className="w-full h-64 bg-gray-200 relative">
                  <Image
                    src={post.file}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </Link>

            <div className="p-5">
              <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {post.content}
              </p>
            </div>
          </article>
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
