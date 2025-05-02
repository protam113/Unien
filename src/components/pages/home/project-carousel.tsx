'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMobile } from '@/hooks/use-mobile';
import SectionHeader from '@/components/container/SectionHeader';

interface Project {
  id: number;
  image: string;
  title: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  const visibleProjects = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, projects.length - visibleProjects);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setDragOffset(0);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      finishDrag();
    }
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      finishDrag();
    }
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const currentX = e.pageX;
    const diff = startX - currentX;
    setDragOffset(diff);
  };

  const finishDrag = () => {
    const threshold = 100; // Minimum drag distance to trigger slide change

    if (dragOffset > threshold && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else if (dragOffset < -threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setDragOffset(0);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentX = e.touches[0].pageX;
    const diff = startX - currentX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      finishDrag();
    }
    setIsDragging(false);
  };

  // Function to view all projects
  const handleViewAll = () => {
    console.log('View all projects');
    // Implement your "view all" functionality here
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12">
      <div className="mb-12">
        <SectionHeader title="Các Dự Án" design="Tiêu Biểu" />
      </div>

      <div className="relative overflow-hidden mb-12">
        <div
          className="relative w-full"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={carouselRef}
        >
          <div
            className={cn(
              'flex gap-6 transition-transform duration-500 ease-in-out',
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            )}
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% / ${visibleProjects} - ${isDragging ? dragOffset : 0}px))`,
              width: `calc(${projects.length * 100}% / ${visibleProjects})`,
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0"
                style={{ width: `calc(100% / ${projects.length})` }}
              >
                <div className="flex flex-col h-full pr-0">
                  <div className="relative aspect-[4/3] w-full mb-4">
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-none"
          onClick={handleViewAll}
        >
          <span>Xem Thêm Các Dự Án</span>
          <ExternalLink className="w-4 h-4" />
        </Button>

        <div className="flex gap-2">
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

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next project"
            className="border border-gray-300 hover:bg-gray-100 rounded-none h-10 w-10"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
