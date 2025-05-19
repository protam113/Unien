'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '@/components/container/SectionHeader';
import { AlertTriangle, ChevronRight, Loader2 } from 'lucide-react';
import { BlogList } from '@/lib/responses/blogLib';
import Container from '@/components/container/Container';

export default function BlogSection() {
  const { blogs, isLoading, isError } = BlogList(
    1,
    {
      limit: 3,
    },
    0
  );

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
      <Container className="mx-auto">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader title="Các Bài Viết Mới Nhất" />

          <Link
            href="/blog"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 hidden md:block"
          >
            Xem Thêm →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center py-10">
              <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
              <span className="ml-2 text-sm text-gray-500">
                Đang tải bài viết...
              </span>
            </div>
          ) : isError ? (
            <div className="col-span-full flex justify-center items-center py-10 text-red-500">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>Không thể tải bài viết. Vui lòng thử lại sau.</span>
            </div>
          ) : (
            blogs.map((post) => <BlogCard key={post._id} post={post} />)
          )}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blogs"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Xem Thêm →
          </Link>
        </div>
      </Container>
    </section>
  );
}

function BlogCard({ post }: { post: any }) {
  return (
    <Card className="group rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link
        href={`/blog/${post.slug}`}
        className="block relative h-64 overflow-hidden"
      >
        <div className="relative h-48 w-full">
          <Image
            src={post.file || '/placeholder.svg'}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <CardContent className="p-5">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-2">vsdasdsasd</p>
        </div>

        <p className="text-sm text-gray-500">{post.date}</p>
        <Link
          href="#"
          className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-primary transition-colors"
        >
          Read post <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
