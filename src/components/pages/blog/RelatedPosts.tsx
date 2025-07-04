'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogList } from '@/lib/responses/blogLib';
import NoResultsFound from '@/components/design/NoResultsFound';
import { formatSmartDate } from '@/utils/formatTimeAgo';

export default function RelatedPosts() {
  const { blogs, isLoading, isError } = BlogList(1, { limit: 3 }, 0);

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <NoResultsFound />
      </div>
    );
  }

  return (
    <section className="py-16 px-4 mx-auto">
      <div className="space-y-12">
        <div className="space-y-4">
          <p className="text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-black rounded-full inline-block"></span>{' '}
            Bài viết mới nhất
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Cập nhật thông tin với <br />
            Tin tức mới nhất{' '}
          </h2>
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-orange-200 hover:bg-orange-300 transition-colors px-4 py-2 rounded-full text-sm font-medium"
            >
              View all blog <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <div
              key={post._id}
              className=" overflow-hidden  shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Link href={`/blog/${post._id}`}>
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={post.file || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-2 h-2 bg-black rounded-full inline-block"></span>{' '}
                    {formatSmartDate(post.createdAt)}
                  </p>
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-gray-600">{post.content}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
