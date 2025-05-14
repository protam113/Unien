'use client';

import Container from '@/components/container/Container';
import AnalyticsDashboard from '@/components/pages/admin/tracking/trackingTable';
import Heading from '@/components/pages/heading/Heading';
import Link from 'next/link';
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
