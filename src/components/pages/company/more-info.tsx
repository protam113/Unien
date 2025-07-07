'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { SectionHeader } from '@/components/wrappers/SectionHeader';

export default function CompanyPortfolio() {
  const missionRef = useRef<HTMLDivElement>(null);
  const commitmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (missionRef.current) observer.observe(missionRef.current);
    if (commitmentRef.current) observer.observe(commitmentRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            ref={missionRef}
            className="text-center transform transition-all duration-1000 opacity-0 translate-y-10"
          >
            <SectionHeader title="Sứ mệnh của chúng tôi" />
            <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl leading-tight">
              Unien - Giải pháp công nghiệp toàn diện và bền vững
            </h1>
            <p className="mt-8 max-w-3xl mx-auto text-xl text-gray-500 leading-relaxed">
              Với mục tiêu trở thành đơn vị tiên phong trong lĩnh vực điện, lò
              hơi, điện mặt trời và công nghệ công nghiệp hiện đại, Unien không
              chỉ cung cấp sản phẩm – chúng tôi mang đến giải pháp đồng bộ, tối
              ưu và bền vững cho từng công trình. Chúng tôi đặt chất lượng, an
              toàn và sự đổi mới làm kim chỉ nam cho mọi dự án mà mình thực
              hiện.
            </p>
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className=" py-24">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={commitmentRef}
            className="lg:grid lg:grid-cols-2 lg:gap-16 items-center transform transition-all duration-1000 opacity-0 translate-y-10"
          >
            <div className="mb-12 lg:mb-0">
              <SectionHeader title="Cam kết của chúng tôi" />
              <p className="text-lg text-gray-600 leading-relaxed">
                Tại Unien, chúng tôi cam kết đồng hành cùng khách hàng từ khâu
                tư vấn, thiết kế đến lắp đặt và bảo trì. Mỗi giải pháp chúng tôi
                đưa ra đều dựa trên sự nghiên cứu kỹ lưỡng, đảm bảo hiệu suất
                cao, tiết kiệm chi phí và thân thiện với môi trường.
                <span className="font-semibold">
                  deliver top-tier tech, stay brutally honest, and never settle
                  for “good enough.”
                </span>
              </p>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Chúng tôi không ngừng đổi mới công nghệ, cập nhật xu hướng để
                mang lại giá trị thực và lợi thế cạnh tranh cho đối tác. Sự
                thành công của bạn là thành công của chúng tôi.
                <span className="font-semibold">
                  Unien – Vững vàng từ nền móng kỹ thuật.
                </span>
              </p>
            </div>
            <div className="relative group">
              <div className="relative  overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/img/boiler2.jpg"
                  alt="Team meeting"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
