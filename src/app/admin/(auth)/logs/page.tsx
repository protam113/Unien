import Container from '@/components/container/Container';
import LogsViewer from '@/components/pages/admin/logs/logTable';
import Heading from '@/components/pages/heading/Heading';
import React from 'react';

const Page = () => {
  return (
    <Container>
      <Heading name="LOGS Page" desc="Manage your seo website here" />

      <LogsViewer />
    </Container>
  );
};

export default Page;
