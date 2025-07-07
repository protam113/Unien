'use client';

import { Container } from '@/components/wrappers/Container';
import {
  HeroHeader,
  SEO,
  ContactSection,
  ContactComponent,
  CategoryCard,
  LoadingSpin,
  ErrorLoading,
  PostCard,
} from '@/components';
import React, { useState } from 'react';
import blogData from '@/data/blog.data.json';
import { BlogList } from '@/lib/responses/blogLib';
import { Icons } from '@/assetts/icons';
import { BlogListSection } from '@/components/pages/blog/BlogListSection';

const Page = () => {
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
    return <LoadingSpin />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <>
      <SEO
        title={blogData.BlogData.title}
        description={blogData.BlogData.description}
      />
      <main>
        <HeroHeader
          title={blogData.BlogData.title}
          description={blogData.BlogData.description}
        />

        <Container className="mx-auto px-4 py-12">
          <div className="mb-8">
            <CategoryCard onCategorySelect={setSelectedCategory} type="blogs" />

            <BlogListSection
              blogs={blogs}
              pagination={pagination}
              loading={loading}
              handleLoadMore={handleLoadMore}
              allLoaded={allLoaded}
            />
          </div>
          <ContactSection title="Dịch Vụ" href="/services" />
          <ContactComponent />
        </Container>
      </main>
    </>
  );
};

export default Page;
