'use client';

import SectionHeader from '@/components/container/SectionHeader';
import { ProjectList } from '@/lib/responses/projectLib';
import Image from 'next/image';

export default function OurProjects() {
  const { projects, isLoading, isError } = ProjectList(
    1,
    {
      status: ['show', 'popular', 'draft'].join(','),
    },
    0
  );

  return (
    <section className="py-16 px-4 mx-auto">
      <div className="text-center mb-16">
        <SectionHeader title="Các Dự Án Đã Thực Hiện" />
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500 py-20">
          Đang tải dữ liệu...
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 py-20">
          Có lỗi xảy ra khi tải dự án. Vui lòng thử lại sau.
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          Hiện chưa có dự án nào để hiển thị.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className=" overflow-hidden bg-gray-50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-[16/9] relative w-full">
                <Image
                  src={project.file || '/placeholder.svg'}
                  alt={project.title}
                  fill
                  className="object-cover "
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6">
                  {project.description || 'Không có mô tả cho dự án này.'}
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  {project.client}
                  {project.brand_name}
                  {project.testimonial}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
