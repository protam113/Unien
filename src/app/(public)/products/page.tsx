import Container from '@/components/container/Container';
import HeroHeader from '@/components/container/Header';
import SEO from '@/components/design/SEO';
import ProductListingPage from '@/components/pages/product/product-listing-page';
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
