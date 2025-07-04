import ContactComponent from '@/components/wrappers/contact-form';
import Container from '@/components/wrappers/Container';
import ContactSection from '@/components/wrappers/cto';
import HeroHeader from '@/components/wrappers/Header';
import SEO from '@/components/design/SEO';
import BlogListData from '@/components/pages/blog/blog-list';
import React from 'react';

const Page = () => {
  return (
    <>
      <SEO
        title="Bài Viết"
        description="Chúng tôi ở đây để giúp đỡ. Hãy liên hệ với nhóm của chúng tôi nếu bạn
      có bất kỳ câu hỏi hoặc thắc mắc nào."
      />
      <main>
        <HeroHeader
          title="Bài Viết"
          description=" Chúng tôi ở đây để giúp đỡ. Hãy liên hệ với nhóm của chúng tôi nếu bạn
      có bất kỳ câu hỏi hoặc thắc mắc nào."
        />

        <Container>
          <BlogListData />
          <ContactSection title="Hell" href="/" />
          <ContactComponent />
        </Container>
      </main>
    </>
  );
};

export default Page;
