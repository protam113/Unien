'use client';

import { BlogDetailData } from '@/lib/responses/blogLib';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import NoResultsFound from '@/components/design/NoResultsFound';
import Container from '@/components/container/Container';
import RelatedPosts from '@/components/pages/blog/RelatedPosts';
import ContactSection from '@/components/container/cto';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { CodeBlockComponent } from '@/components/richText/ContentSection';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Page() {
  const { slug } = useParams();
  const blogSlug = Array.isArray(slug) ? slug[0] : slug || '';

  const { blog, isLoading, isError } = BlogDetailData(blogSlug, 0);

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
    <Container className="mt-18">
      <article className="mx-auto max-w-7xl">
        <Link
          href="/blogs"
          className="inline-block mb-8 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Home
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
            {blog?.title}
          </h1>

          <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between text-sm text-gray-600 mb-8">
            <div className="mb-2 sm:mb-0">
              <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
                POSTED BY
              </span>
              <p>HUST4L</p>
            </div>

            <div className="mb-2 sm:mb-0">
              <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
                CATEGORIES
              </span>
              <p>{blog?.category.name}</p>
            </div>

            <div>
              <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
                POSTED ON
              </span>
              <p>
                {blog?.createdAt
                  ? formatSmartDate(blog.createdAt)
                  : 'No date available'}
              </p>
            </div>
          </div>
        </header>

        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={blog?.file || '/placeholder.svg'}
            alt={`Featured image for ${blog?.title}`}
            width={800}
            height={400}
            className="w-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mt-12 mb-6">{blog?.content}</h2>

          <div className="leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                blockquote: ({ children }) => (
                  <blockquote className="custom-blockquote">
                    {children}
                  </blockquote>
                ),
                code: ({ inline, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || '');

                  if (!inline) {
                    return (
                      <CodeBlockComponent
                        value={String(children).replace(/\n$/, '')}
                        language={match ? match[1] : undefined}
                      />
                    );
                  }

                  return (
                    <code className="inline-code" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {blog?.description}
            </ReactMarkdown>
          </div>
        </div>
      </article>
      <RelatedPosts />
      <ContactSection href="/blogs" title="BLOGS" />
    </Container>
  );
}
