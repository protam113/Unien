import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '@/components/container/SectionHeader';
import { ChevronRight } from 'lucide-react';

// Blog post type definition
type BlogPost = {
  id: string;
  title: string;
  image: string;
  date: string;

  slug: string;
};

// Sample blog data (replace with your actual data)
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Exploring the beautiful landscapes of nature',
    image: '/img/process1.png?height=200&width=400',
    date: 'May 2, 2023',

    slug: 'exploring-landscapes',
  },
  {
    id: '2',
    title: 'Urban architecture and city planning insights',
    image: '/img/process1.png?height=200&width=400',
    date: 'April 15, 2023',

    slug: 'urban-architecture',
  },
  {
    id: '3',
    title: 'Travel photography tips for beginners',
    image: '/img/process1.png?height=200&width=400',
    date: 'March 28, 2023',

    slug: 'travel-photography-tips',
  },
];

export default function BlogSection() {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
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
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Xem Thêm →
          </Link>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link
        href={`/blog/${post.slug}`}
        className="block relative h-64 overflow-hidden"
      >
        <div className="relative h-48 w-full">
          <Image
            src={post.image || '/placeholder.svg'}
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
