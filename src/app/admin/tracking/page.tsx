'use client';

import Container from '@/components/container/Container';
import Heading from '@/components/design/Heading';
import AnalyticsDashboard from '@/components/pages/admin/tracking/trackingTable';
import React from 'react';

const Page = () => {
  return (
    <Container>
      {/* Heading */}
      <Heading name="Tracking Page" desc="Manage your projects here" />
      <AnalyticsDashboard />
    </Container>
  );
};

export default Page;
