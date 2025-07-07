'use client';

import { CardProps } from '@/types';
import Link from 'next/link';
import { CustomImage } from '../design/image.component';

export function PostCard({ _id, title, slug, content, file, type }: CardProps) {
  const href = type === 'service' ? `/services/${slug}` : `/blogs/${slug}`;

  return (
    <article
      key={_id}
      className="overflow-hidden shadow-lg hover:shadow-md transition-shadow duration-300"
    >
      <Link href={href} className="block">
        <div className="relative overflow-hidden group">
          <div className="w-full h-64 bg-gray-200 relative">
            <CustomImage
              src={file}
              alt={title}
              fill
              // sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </div>
      </Link>

      <div className="p-5">
        <h3 className="text-xl font-bold mt-2 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{content}</p>
      </div>
    </article>
  );
}
