'use client';
import SectionHeader from '@/components/wrappers/SectionHeader';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ServiceList } from '@/lib/responses/serviceLib';
import { AlertTriangle, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Service {
  title: string;
  description?: string;
  file: string;
  slug: string;
}

export default function ServicesTabs() {
  const { services, isLoading, isError } = ServiceList(
    1,
    {
      limit: 6,
    },
    0
  );

  return (
    <div className="mx-auto px-4 py-12">
      <Tabs defaultValue="services" className="space-y-8">
        <TabsContent value="services" className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <SectionHeader title="Dịch Vụ & Công Nghiệp" />
              <Link
                href="/services"
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
              >
                Xem Thêm
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-lg text-muted-foreground">
              Chúng tôi cung cấp giải pháp toàn diện trong lĩnh vực điều khiển –
              tự động hóa cho hệ thống lò hơi và thiết bị công nghiệp. Từ lắp
              đặt tủ điện, lập trình PLC, đến cải tạo, nâng cấp và vận hành an
              toàn, đội ngũ kỹ thuật của chúng tôi luôn đồng hành để tối ưu hiệu
              suất và đảm bảo hoạt động ổn định cho doanh nghiệp bạn.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center py-10">
                <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
                <span className="ml-2 text-sm text-gray-500">
                  Đang tải dịch vụ...
                </span>
              </div>
            ) : isError ? (
              <div className="col-span-full flex justify-center items-center py-10 text-red-500">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span>
                  Không thể tải dữ liệu dịch vụ. Vui lòng thử lại sau.
                </span>
              </div>
            ) : (
              services.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={service.slug}
      className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-black/80 lg:aspect-[3/2]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
        style={{ backgroundImage: `url(${service.file})` }}
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
    </Link>
  );
}
