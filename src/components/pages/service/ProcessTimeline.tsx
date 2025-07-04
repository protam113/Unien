'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import SectionHeader from '@/components/wrappers/SectionHeader';

interface ProcessStepProps {
  title: string;
  startPosition: string;
  color: string;
  width: string;
  delay: number;
  row: 'top' | 'bottom';
  isVisible: boolean;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  title,
  startPosition,
  color,
  width,
  delay,
  row,
  isVisible,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Only start the animation countdown when the parent section is visible
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimate(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay, isVisible]);

  return (
    <div
      className="absolute"
      style={{
        left: startPosition,
        width: width,
        top: row === 'top' ? '0' : '80px', // Position based on row
      }}
    >
      <div className="text-sm font-medium mb-2">{title}</div>
      <div
        className={cn(
          'h-3 rounded-full transition-all duration-1000 ease-out',
          color
        )}
        style={{
          width: animate ? '100%' : '0%',
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
};

const ProcessTimeline: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Create intersection observer to detect when section is scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once triggered, we can disconnect the observer
          observer.disconnect();
        }
      },
      {
        // Trigger when at least 20% of the element is visible
        threshold: 0.2,
        // Add rootMargin to trigger slightly before the element comes into view
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Start observing the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Clean up observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 mx-auto">
      <div
        className={cn(
          'opacity-0 transform translate-x-10 transition-all duration-1000 ease-out',
          isVisible && 'opacity-100 translate-x-0'
        )}
      >
        <div className="flex flex-col">
          <SectionHeader title="Quy Trình Làm Việc" />
          <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">
            Hiệu quả bắt đầu từ quy trình bài bản
          </h2>
          <p className="text-gray-600 max-w-3xl mb-16">
            Tại <span className="text-main font-bold">Unien</span>, mỗi công
            trình đều được thực hiện theo một quy trình rõ ràng và chuyên nghiệp
            — từ khảo sát thực tế, thiết kế hệ thống cho đến thi công lắp đặt và
            bàn giao.
            <br />
            Chúng tôi không chỉ cung cấp thiết bị chất lượng mà còn tối ưu toàn
            bộ giải pháp về kỹ thuật, vận hành và an toàn.
            <br />
            Với đội ngũ kỹ sư giàu kinh nghiệm,{' '}
            <span className="font-semibold">
              Unien cam kết mang đến hệ thống vận hành ổn định, tiết kiệm năng
              lượng và đạt hiệu suất cao
            </span>{' '}
            ngay từ ngày đầu đưa vào sử dụng.
          </p>
        </div>

        <div className="relative h-64">
          {/* Vertical dotted lines */}
          <div className="absolute left-0 top-0 bottom-0 border-l border-dashed border-gray-300 h-full"></div>
          <div className="absolute left-1/4 top-0 bottom-0 border-l border-dashed border-gray-300 h-full"></div>
          <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-gray-300 h-full"></div>
          <div className="absolute left-3/4 top-0 bottom-0 border-l border-dashed border-gray-300 h-full"></div>
          <div className="absolute right-0 top-0 bottom-0 border-l border-dashed border-gray-300 h-full"></div>

          {/* Process steps - Staggered in two rows */}
          <div className="relative h-full">
            {/* Top row */}
            <ProcessStep
              title="Khảo sát & Nghiên cứu "
              startPosition="0%"
              color="bg-gray-300"
              width="20%"
              delay={0}
              row="top"
              isVisible={isVisible}
            />

            <ProcessStep
              title="Lập kế hoạch triển khai"
              startPosition="40%"
              color="bg-gray-700"
              width="35%"
              delay={600}
              row="top"
              isVisible={isVisible}
            />

            <ProcessStep
              title="Thi công & Lắp đặt"
              startPosition="90%"
              color="bg-black"
              width="10%"
              delay={1200}
              row="top"
              isVisible={isVisible}
            />

            {/* Bottom row */}
            <ProcessStep
              title="Tối ưu vận hành hệ thống"
              startPosition="20%"
              color="bg-gray-500"
              width="20%"
              delay={300}
              row="bottom"
              isVisible={isVisible}
            />

            <ProcessStep
              title="Báo cáo & Bàn giao"
              startPosition="75%"
              color="bg-gray-800"
              width="15%"
              delay={900}
              row="bottom"
              isVisible={isVisible}
            />
          </div>

          {/* Timeline indicators */}
          <div className="absolute bottom-0 w-full">
            <div className="absolute w-full h-px bg-gray-800"></div>
            <div className="flex justify-between w-full text-gray-500">
              <div className="relative -translate-x-1/2">
                <span>0%</span>
              </div>
              <div className="relative -translate-x-1/2">
                <span>25%</span>
              </div>
              <div className="relative -translate-x-1/2">
                <span>50%</span>
              </div>
              <div className="relative -translate-x-1/2">
                <span>75%</span>
              </div>
              <div className="relative -translate-x-1/2">
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
