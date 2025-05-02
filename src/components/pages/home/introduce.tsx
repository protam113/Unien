import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/container/SectionHeader';

export default function IndustrialIntro() {
  return (
    <section className="w-full bg-white">
      <SectionHeader title="Về Chúng Tôi" />
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left side with image and years badge */}
          <div className="relative">
            <div className="relative h-[300px] w-full overflow-hidden rounded-lg md:h-[400px]">
              <Image
                src="/img/boiler1.jpg"
                alt="Industrial worker examining blueprints"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right side with content */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-3xl font-semibold leading-tight text-gray-900 md:text-4xl">
              ĐIỆN TỰ ĐỘNG HÓA
              <span className="text-5xl font-bold  text-[#F69429]"> Unien</span>
            </h1>
            <p className="mb-6 text-gray-600">
              Với uy tín trên thị trường, Công ty TNHH Điện Tự Động{' '}
              <span className="font-bold text-[#F69429]">Unien</span> được biết
              đến là nhà cung cấp chuyên nghiệp với sản phẩm và dịch vụ chất
              lượng cao. Giải pháp kỹ thuật tối ưu cho khách hàng và đối tác
              trong lĩnh vực Lò Hơi Công Nghiệp.
            </p>

            {/* Services list */}
            <ul className="mb-8 space-y-2">
              {[
                'Sản xuất kinh doanh',
                'Công nghệ tiên tiến',
                'Quy trình sản xuất hiệu quả',
                'An toàn và Tối ưu',
              ].map((service, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white">
                    ✓
                  </span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>

            {/* CTA and rating */}
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <Link
                href="/about"
                className="flex items-center gap-2 rounded bg-amber-500 px-4 py-2 font-medium text-white transition hover:bg-amber-600"
              >
                Xem Thêm
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
