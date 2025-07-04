import ContactComponent from '@/components/wrappers/contact-form';
import Container from '@/components/wrappers/Container';
import { StatsSection } from '@/components/wrappers/StartSection';
import HeroBanner from '@/components/layout/DefaultLayout/Hero';
import BlogSection from '@/components/pages/home/blog-section';
import IndustrialIntro from '@/components/pages/home/introduce';
import ProductShowcase from '@/components/pages/home/product-showcase';
import ProjectCarousel from '@/components/pages/home/project-carousel';
import ServicesData from '@/components/pages/home/service';

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <Container className="mt-16">
        <IndustrialIntro />
      </Container>

      <StatsSection />
      <Container>
        <ServicesData />
        <ProductShowcase />
        <ProjectCarousel />

        <BlogSection />
        <ContactComponent />
      </Container>
    </main>
  );
}
