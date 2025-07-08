import { ContactComponent, Container } from '@/components';
import { StatsSection } from '@/components/wrappers/StartSection';
import { HeroBanner } from '@/components/layout/DefaultLayout/Hero';
import { BlogSection, ServicesTabs } from '@/components/pages';
import { IndustrialIntro } from '@/components/pages/home/introduce';
import ProductShowcase from '@/components/pages/home/product-showcase';
import ProjectCarousel from '@/components/pages/home/project-carousel';

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <Container className="mt-16">
        <IndustrialIntro />
      </Container>

      <StatsSection />
      <Container>
        <ServicesTabs />
        <ProductShowcase />
        <ProjectCarousel />

        <BlogSection />
        <ContactComponent />
      </Container>
    </main>
  );
}
