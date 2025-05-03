'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  slug: string;
  status: string;
  file: string;
  createdAt: string | Date;
  content: string;
  user?: {
    username: string;
    role: string;
  };
  views: number;
}

interface PostCardProps {
  blog: Post;
}

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function BlogCard({ blog }: PostCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <Link href={`/admin/blog/${blog.slug}`}>
        <div className="relative h-48">
          <Image
            src={blog.file || '/placeholder.svg'}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/admin/service/${blog.slug}`}>
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{blog.views} views read</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">{blog.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {blog.content}
          </p>
        </Link>
        <div className="flex items-start justify-between w-full">
          {/* Avatar + Info */}
          <div className="flex items-center gap-2">
            <Image
              src={'/logo.png'}
              alt={blog?.user?.username || 'User'}
              width={30}
              height={30}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {blog?.user?.username}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(blog.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 👇 Fake data dùng để test UI
const mockPost: Post = {
  _id: 'abc123',
  title: 'Web3 is Dead, Long Live Web3',
  slug: 'web3-dead-long-live',
  status: 'published',
  file: '/images/sample-blog.jpg', // Hoặc '/placeholder.svg'
  createdAt: '2025-05-03T08:15:00Z',
  content:
    'This article dives deep into the current state of Web3, the hype, the crash, and what’s next...',
  user: {
    username: 'lenf.dev',
    role: 'admin',
  },
  views: 1209,
};

// 👇 Preview component cho dev test
export default function BlogCardPreview() {
  return (
    <div className="max-w-md mx-auto my-10">
      <BlogCard blog={mockPost} />
    </div>
  );
}
