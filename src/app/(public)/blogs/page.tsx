import ContactComponent from '@/components/container/contact-form';
import Container from '@/components/container/Container';
import HeroHeader from '@/components/container/Header';
import SEO from '@/components/design/SEO';
import BlogListData from '@/components/pages/blog/blog-list';
import React from 'react';

const Page = () => {
  return (
    <>
      <SEO
        title="Blogs"
        description="Unien brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <main>
        <HeroHeader
          title="Bài Viết"
          description=" Chúng tôi ở đây để giúp đỡ. Hãy liên hệ với nhóm của chúng tôi nếu bạn
      có bất kỳ câu hỏi hoặc thắc mắc nào."
        />

        <Container>
          <BlogListData />
          <ContactComponent />
        </Container>
      </main>
    </>
  );
};

export default Page;
