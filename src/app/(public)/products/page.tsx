import { Container } from '@/components/wrappers/Container';
import { HeroHeader, SEO } from '@/components';
import { ProductListingPage } from '@/components/pages/product/product-listing-page';
import React from 'react';

const Page = () => {
  return (
    <>
      <SEO
        title="Sản Phẩm"
        description="Unien brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <main>
        <HeroHeader
          title="Sản Phẩm"
          description=" Chúng tôi ở đây để giúp đỡ. Hãy liên hệ với nhóm của chúng tôi nếu bạn
      có bất kỳ câu hỏi hoặc thắc mắc nào."
        />

        <Container>
          <ProductListingPage />
        </Container>
      </main>
    </>
  );
};

export default Page;
