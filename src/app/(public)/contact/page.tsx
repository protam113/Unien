import ContactComponent from '@/components/container/contact-form';
import Container from '@/components/container/Container';
import HeroHeader from '@/components/container/Header';
import SEO from '@/components/design/SEO';
import React from 'react';

const Page = () => {
  return (
    <>
      <SEO
        title="Liên Hệ"
        description="Chúng tôi ở đây để giúp đỡ. Hãy liên hệ với nhóm của chúng tôi nếu bạn
      có bất kỳ câu hỏi hoặc thắc mắc nào."
      />

      <main>
        <HeroHeader
          title="Liên Hệ Với Chúng Tôi"
          description=" Chúng tôi ở đây để giúp đỡ. Hãy liên hệ với nhóm của chúng tôi nếu bạn
      có bất kỳ câu hỏi hoặc thắc mắc nào."
        />

        <Container>
          <ContactComponent />
        </Container>
      </main>
    </>
  );
};

export default Page;
