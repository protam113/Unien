import BackButton from '@/components/button/BackButton';
import Container from '@/components/wrappers/Container';
import Heading from '@/components/design/Heading';
import { SeoSettingsForm } from '@/components/pages/admin/seo/updateSeoForm';

const Page = () => {
  return (
    <Container>
      <BackButton />
      <Heading name="SEO Page" desc="Manage your seo website here" />

      <SeoSettingsForm />
    </Container>
  );
};

export default Page;
