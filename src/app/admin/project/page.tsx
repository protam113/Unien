'use client';

import PushButton from '@/components/button/PushButton';
import Container from '@/components/container/Container';
import ProjectListDataAdmin from '@/components/pages/admin/project/ProjectList';
import Heading from '@/components/pages/heading/Heading';
import React, { useState } from 'react';

const Page = () => {
  return (
    <Container>
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <Heading name="Project Page" desc="Manage your projects here" />
        <PushButton
          href="/admin/project/create_project"
          label="Create Project"
        />
      </div>
      {/* Link tạo bài viết */}
      <ProjectListDataAdmin />
    </Container>
  );
};

export default Page;
