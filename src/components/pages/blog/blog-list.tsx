'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import CategoryCard from './BlogCategory';
import { BlogList } from '@/lib/responses/blogLib';
import Container from '@/components/wrappers/Container';

export default function BlogGrid() {
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const params = {
    category: selectedCategory ?? undefined,
    limit: 10,
  };

  const { blogs, isLoading, isError, pagination } = BlogList(
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
        <p className="text-red-500">Error loading blog posts</p>
      </div>
    );
  }

  return (
    <Container className="mx-auto px-4 py-12">
      <CategoryCard onCategorySelect={setSelectedCategory} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <article
            key={post._id}
            className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Link href={`/blogs/${post.slug}`} className="block">
              <div className="relative overflow-hidden group">
                <Image
                  src={post.file || '/placeholder.svg'}
                  alt={post.title}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay with gradient - always visible but darker on hover */}
              </div>
            </Link>

            <div className="p-5">
              {/* <span className="text-sm text-gray-500">{post.createdAt}</span> */}
              <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.content}</p>
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
                     hover:bg-main hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50
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
    </Container>
  );
}
