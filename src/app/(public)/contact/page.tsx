import ContactComponent from '@/components/container/contact-form';
import Container from '@/components/container/Container';
import HeroHeader from '@/components/container/Header';
import React from 'react';

const Page = () => {
  return (
    <main>
      <HeroHeader />
      <Container>
        <ContactComponent />
      </Container>
    </main>
  );
};

export default Page;
