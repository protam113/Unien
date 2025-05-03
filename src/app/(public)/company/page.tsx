import ContactComponent from '@/components/container/contact-form';
import Container from '@/components/container/Container';
import HeroHeader from '@/components/container/Header';
import { StatsSection } from '@/components/container/StartSection';
import { WhoAreWeSection } from '@/components/pages/company/about-us';
import CompanyPortfolio from '@/components/pages/company/more-info';
import OurProjects from '@/components/pages/company/our-project';
import React from 'react';

const Page = () => {
  return (
    <main>
      <HeroHeader
        title="Contact Us"
        description=" Chúng tôi ở đây để giúp đỡ. Hãy liên hệ với nhóm của chúng tôi nếu bạn
      có bất kỳ câu hỏi hoặc thắc mắc nào."
      />

      <Container>
        <WhoAreWeSection />
      </Container>
      <StatsSection />
      <Container>
        <CompanyPortfolio />
        <OurProjects />
        <ContactComponent />
      </Container>
    </main>
  );
};

export default Page;
