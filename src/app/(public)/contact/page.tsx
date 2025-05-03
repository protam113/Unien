import ContactComponent from '@/components/container/contact-form';
import Container from '@/components/container/Container';
import HeroHeader from '@/components/container/Header';
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
        <ContactComponent />
      </Container>
    </main>
  );
};

export default Page;
