'use client';

import PushButton from '@/components/button/PushButton';
import Container from '@/components/container/Container';
import Header from '@/components/design/Header';
import BlogListData from '@/components/pages/admin/blog/BlogList';
import React from 'react';

const Page = () => {
  return (
    <Container>
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <Header title="Blog Page" />
        <PushButton href="/admin/blog/create_blog" label="Create Blog" />
      </div>

      <BlogListData />
    </Container>
  );
};

export default Page;
