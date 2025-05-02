import ContactComponent from '@/components/container/contact-form';
import Container from '@/components/container/Container';
import { StatsSection } from '@/components/container/StartSection';
import HeroBanner from '@/components/layout/DefaultLayout/Hero';
import BlogSection from '@/components/pages/home/blog-section';
import IndustrialIntro from '@/components/pages/home/introduce';
import ProjectCarousel from '@/components/pages/home/project-carousel';
import ServicesData from '@/components/pages/home/service';
import Image from 'next/image';

export default function Home() {
  const projects = [
    {
      id: 1,
      image: '/img/process1.png?height=600&width=800',
      title: 'A UX/UI redesign reactivated a marketplace with 58,000+ users',
    },
    {
      id: 2,
      image: '/img/process1.png?height=600&width=800',
      title:
        'Creating one platform to manage 6 sites led to a 400% revenue growth',
    },
    {
      id: 3,
      image: '/img/process1.png?height=600&width=800',
      title:
        "A bank's first cloud-native payment system reaches 36+ new countries",
    },
    {
      id: 4,
      image: '/img/process1.png?height=600&width=800',
      title: "Travelia's user acquisition cost fell by 40%",
    },
  ];
  return (
    <main>
      <HeroBanner />
      <Container className="mt-16">
        <IndustrialIntro />
      </Container>

      <StatsSection />
      <Container>
        <ProjectCarousel projects={projects} />
        <ServicesData />
        <BlogSection />
        <ContactComponent />
      </Container>
    </main>
  );
}
