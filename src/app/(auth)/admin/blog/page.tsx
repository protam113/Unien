'use client';

import { PushButton } from '@/components';
import { Container } from '@/components';
import { Heading } from '@/components/design/Heading';
import BlogListData from '@/components/pages/admin/blog/BlogList';
import React from 'react';

const Page = () => {
  return (
    <Container>
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <Heading name="Bài viết" />
        <PushButton href="/admin/blog/create_blog" label="Tạo bài viết" />
      </div>

      <BlogListData />
    </Container>
  );
};

export default Page;
