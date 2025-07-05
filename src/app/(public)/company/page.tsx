import { Container } from '@/components/wrappers/Container';
import { StatsSection } from '@/components/wrappers/StartSection';
import { SEO, HeroHeader, ContactComponent } from '@/components';
import { WhoAreWeSection } from '@/components/pages/company/about-us';
import CompanyPortfolio from '@/components/pages/company/more-info';
import OurProjects from '@/components/pages/company/our-project';
import React from 'react';

const Page = () => {
  return (
    <>
      <SEO
        title="Giới Thiệu Unien"
        description="Unien là đối tác đáng tin cậy trong lĩnh vực Lò Hơi Công Nghiệp, Tủ Điện và Giải Pháp Năng Lượng. Chúng tôi cam kết mang đến giá trị thật, dịch vụ tận tâm và giải pháp bền vững cho doanh nghiệp của bạn."
      />

      <main>
        <HeroHeader
          title="Chúng Tôi Là Unien"
          description="Với kinh nghiệm trong lĩnh vực điện – lò hơi – năng lượng tái tạo, chúng tôi không ngừng cải tiến để mang đến giải pháp kỹ thuật hiệu quả, tiết kiệm và bền vững cho khách hàng khắp cả nước."
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
    </>
  );
};

export default Page;
