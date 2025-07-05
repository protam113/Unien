import { Container } from '@/components/wrappers/Container';
import { HeroHeader, SEO, ContactComponent } from '@/components';
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

          <div className="h-[450px] w-full overflow-hidden border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2329.5873653111134!2d106.78562651421029!3d10.896470564846595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8ececefa8e7%3A0x3853d60278a7a2df!2zNjksIMSQw7RuZyBIw7JhLCBExKkgQW4sIELDrG5oIETGsMahbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2sus!4v1751697886418!5m2!1svi!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Page;
