'use client';

import ContactComponent from '@/components/container/contact-form';
import Container from '@/components/container/Container';
import HeroHeader from '@/components/container/Header';
import SEO from '@/components/design/SEO';
import ProcessTimeline from '@/components/pages/service/ProcessTimeline';
import ServiceCategoryCard from '@/components/pages/service/service-category';
import ServiceListData from '@/components/pages/service/service-list';
import React, { useState } from 'react';

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Dịch Vụ"
        description="Unien brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <main>
        <HeroHeader
          title="Dịch Vụ"
          description=" Chúng tôi ở đây để giúp đỡ. Hãy liên hệ với nhóm của chúng tôi nếu bạn
    có bất kỳ câu hỏi hoặc thắc mắc nào."
        />
        <Container>
          <ServiceCategoryCard onCategorySelect={setSelectedCategory} />
          <ServiceListData selectedCategory={selectedCategory} />
          <ProcessTimeline />
          <ContactComponent />
        </Container>
      </main>
    </>
  );
};

export default Page;
