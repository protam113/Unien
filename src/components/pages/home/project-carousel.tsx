'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SectionHeader from '@/components/container/SectionHeader';
import { ProjectList } from '@/lib/responses/projectLib';

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [transition, setTransition] = useState(true);
  const { projects, isLoading, isError } = ProjectList(1, {}, 0);

  // Adjust slides per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2); // Tablet
      } else {
        setSlidesPerView(3); // Desktop
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(projects.length / slidesPerView);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate which projects to show based on current index and slidesPerView
  const visibleProjects = projects.slice(
    currentIndex * slidesPerView,
    Math.min((currentIndex + 1) * slidesPerView, projects.length)
  );

  const handleViewAll = () => {
    console.log('View all projects');
    // Implement your "view all" functionality here
  };

  return (
    <div className=" mx-auto ">
      <div className="mb-8 md:mb-12">
        <SectionHeader title="Các Dự Án" design="Tiêu Biểu" />
      </div>

      <div className="mb-8 md:mb-12">
        {/* Projects display area with transition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-full py-10 text-gray-500">
              <ArrowRight className="animate-spin h-5 w-5 mr-2" />
              <span>Đang tải dự án...</span>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center text-red-500 py-10">
              <span>Không thể tải dữ liệu dự án. Vui lòng thử lại sau.</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-500 py-10">
              <span>Hiện chưa có dự án nào để hiển thị.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((project) => (
                <div
                  key={project._id}
                  className={cn(
                    'flex flex-col h-full transform transition-all duration-500',
                    transition
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  )}
                  onTransitionEnd={() => transition && setTransition(true)}
                >
                  <div className="relative aspect-[4/3] w-full mb-4 overflow-hidden group">
                    <Image
                      src={project.file || '/placeholder.svg'}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300" />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-gray-800 group-hover:text-gray-600 transition">
                    {project.title}
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <Button
          variant="secondary"
          className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-none w-full sm:w-auto"
          onClick={handleViewAll}
        >
          <span>Xem Thêm Các Dự Án</span>
          <ExternalLink className="w-4 h-4" />
        </Button>

        <div className="flex items-center justify-center w-full sm:w-auto">
          {/* Pagination indicators */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous project"
              className="border border-gray-300 hover:bg-gray-100 rounded-none h-10 w-10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    'w-3 h-3 rounded-full transition-all duration-300',
                    currentIndex === index
                      ? 'bg-gray-800 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= totalSlides - 1}
              aria-label="Next project"
              className="border border-gray-300 hover:bg-gray-100 rounded-none h-10 w-10"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
