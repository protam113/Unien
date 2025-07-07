'use client';

import { BlogDetailData } from '@/lib/responses/blogLib';
import { useParams } from 'next/navigation';
import NoResultsFound from '@/components/design/NoResultsFound';
import RelatedPosts from '@/components/pages/blog/RelatedPosts';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { CodeBlockComponent } from '@/components/richText/ContentSection';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  BackButton,
  Container,
  ContactSection,
  CustomImage,
  LoadingSpin,
  SEO,
} from '@/components';
import { ROUTES } from '@/lib';
import Heading from '@/components/design/Heading';
import { PostRecent } from '@/components/card/post_recent.card';

export default function Page() {
  const { slug } = useParams();
  const blogSlug = Array.isArray(slug) ? slug[0] : slug || '';

  const { blog, isLoading, isError } = BlogDetailData(blogSlug, 0);
  if (isLoading) {
    return <LoadingSpin />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <NoResultsFound />
      </div>
    );
  }

  return (
    <>
      <SEO
        title={blog?.title || 'Bài Viết'}
        description={blog?.content || ''}
        image={blog?.file || '/logo.svg'}
      />

      <Container className="mt-26">
        <BackButton href="/blogs" />
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <header className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold mb-8">
                {blog?.title}
              </h1>
              <div className="mb-2 sm:mb-0 flex flex-wrap items-center gap-1 text-sm text-gray-600">
                <span>Unien</span>
                <span>-</span>
                <span>
                  {blog?.createdAt
                    ? formatSmartDate(blog.createdAt)
                    : 'No date available'}
                </span>
                <span>-</span>
                <span>{blog?.category?.name}</span>
              </div>
            </header>

            <div className="mb-8 bg-black relative h-[400px] w-full overflow-hidden">
              <CustomImage
                src={blog?.file || '/logo.svg'}
                alt={`Featured image for ${blog?.title}`}
                fill
                className="object-contain"
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
          </div>
          <div className=" col-span-12 lg:col-span-4  p-6 ">
            <div>
              <div className=" mb-4">
                <Heading name="Bài Viết Liên Quan" />
              </div>
              <PostRecent category={blog?.category?._id} />
            </div>
            <div className="pt-10">
              <div className=" mb-4">
                <Heading name="Bài Viết Mới Nhất" />
              </div>
              <PostRecent />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <ContactSection href={ROUTES.BLOG.ROOT} title="Bài Viết" />
          {/* <RelatedPosts />\ */}
        </div>
      </Container>
    </>
  );
}
