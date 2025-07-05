'use client';
import { ServiceList } from '@/lib';
import Link from 'next/link';
import { Service } from '@/types';
import servicesData from '@/data/service.data.json';
import { ROUTES } from '@/lib';
import {
  ErrorLoading,
  LoadingSpin,
  SectionHeader,
  Tabs,
  TabsContent,
} from '@/components';
import { Icons } from '@/assetts/icons';

export function ServicesTabs() {
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
              <SectionHeader title={servicesData.ServiceData.title} />
              <Link
                href={ROUTES.SERVICE.ROOT}
                className="text-base text-gray-500 hover:text-gray-700 flex items-center"
              >
                Xem Thêm
                <Icons.ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-lg text-muted-foreground">
              {servicesData.ServiceData.description}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <LoadingSpin message="Đang tải dịch vụ..." />
            ) : isError ? (
              <ErrorLoading message="Không thể tải dữ liệu dịch vụ. Vui lòng thử lại sau." />
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
      className="group relative overflow-hidden lg:aspect-[3/2]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
        style={{ backgroundImage: `url(${service.file})` }}
      />
      <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/50" />
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
