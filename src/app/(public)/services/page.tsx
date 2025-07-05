'use client';

import React, { useState } from 'react';
import {
  HeroHeader,
  SEO,
  ContactComponent,
  CategoryCard,
  Container,
} from '@/components';
import { ProcessTimeline } from '@/components/pages/service/ProcessTimeline';
import { ServiceListData } from '@/components/pages/service/service-list';
import servicesData from '@/data/service.data.json';

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <SEO title="Dịch Vụ" description={servicesData.ServicePage.desc_1} />
      <main>
        <HeroHeader
          title={servicesData.ServicePage.title}
          description={`${servicesData.ServicePage.desc_1} ${servicesData.ServicePage.desc_2}  `}
        />
        <Container>
          <CategoryCard
            onCategorySelect={setSelectedCategory}
            type="services"
          />
          <ServiceListData selectedCategory={selectedCategory} />
          <ProcessTimeline />
          <ContactComponent />
        </Container>
      </main>
    </>
  );
};

export default Page;
