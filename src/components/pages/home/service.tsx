'use client';
import SectionHeader from '@/components/container/SectionHeader';
import { Tabs, TabsContent } from '@/components/ui/tabs';

interface Service {
  title: string;
  description?: string;
  image: string;
  link: string;
}

const services: Service[] = [
  {
    title: 'Dịch Vụ Lắp Đặt Tủ Điện',
    description:
      'Cung cấp và lắp đặt tủ điện điều khiển cho hệ thống lò hơi, đảm bảo vận hành ổn định, an toàn và tuân thủ tiêu chuẩn công nghiệp.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VtdHhFYUULFyy0MFGL9x7ktNJXnDZX.png',
    link: '#',
  },
  {
    title: 'Dịch Vụ Cung Cấp Phần Mềm PLC',
    description:
      'Thiết kế phần mềm PLC chuyên dụng cho điều khiển lò hơi và các hệ thống nhiệt, tối ưu hóa quá trình vận hành và giám sát từ xa.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VtdHhFYUULFyy0MFGL9x7ktNJXnDZX.png',
    link: '#',
  },
  {
    title: 'Dịch Vụ Cải Tạo Và Nâng Cấp Hệ Thống',
    description:
      'Cải tiến hệ thống lò hơi cũ để nâng cao hiệu suất đốt, tiết kiệm nhiên liệu và đảm bảo an toàn khi vận hành trong môi trường công nghiệp.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VtdHhFYUULFyy0MFGL9x7ktNJXnDZX.png',
    link: '#',
  },
  {
    title: 'Dịch Vụ Căn Chỉnh Đốt Và Vận Hành Lò Hơi',
    description:
      'Hiệu chỉnh hệ thống đốt và hướng dẫn vận hành lò hơi theo đúng thông số kỹ thuật, giúp tối ưu quá trình sinh hơi và kéo dài tuổi thọ thiết bị.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VtdHhFYUULFyy0MFGL9x7ktNJXnDZX.png',
    link: '#',
  },
  {
    title: 'Dịch Vụ Cung Cấp Thiết Bị Đo Lường',
    description:
      'Phân phối và lắp đặt các thiết bị đo áp suất, nhiệt độ, lưu lượng... chuyên dùng cho hệ thống lò hơi, đảm bảo giám sát chính xác và an toàn.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VtdHhFYUULFyy0MFGL9x7ktNJXnDZX.png',
    link: '#',
  },
];

export default function ServicesTabs() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Tabs defaultValue="services" className="space-y-8">
        <TabsContent value="services" className="space-y-8">
          <div>
            <SectionHeader title="Dịch Vụ & Công Nghiệp" />

            <p className="mt-4 text-lg text-muted-foreground">
              Chúng tôi cung cấp giải pháp toàn diện trong lĩnh vực điều khiển –
              tự động hóa cho hệ thống lò hơi và thiết bị công nghiệp. Từ lắp
              đặt tủ điện, lập trình PLC, đến cải tạo, nâng cấp và vận hành an
              toàn, đội ngũ kỹ thuật của chúng tôi luôn đồng hành để tối ưu hiệu
              suất và đảm bảo hoạt động ổn định cho doanh nghiệp bạn.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <a
      href={service.link}
      className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-black/80 lg:aspect-[3/2]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
        style={{ backgroundImage: `url(${service.image})` }}
      />
      <div className="absolute inset-0 bg-black/60 transition-all duration-500 group-hover:bg-black/75" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-xl font-semibold text-white transition-transform duration-500 group-hover:-translate-y-4">
          {service.title}
        </h3>
        {service.description && (
          <p className="mt-2 text-sm text-white/90 opacity-0 -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            {service.description}
          </p>
        )}
      </div>
    </a>
  );
}
