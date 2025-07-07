'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';
import { Button, CustomImage } from '@/components';
import { ProductGalleryProps } from '@/types';

export function ProductGallery({ images }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // If no images are provided, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
        <CustomImage
          src="/logo.svg?height=600&width=600&text=No+Image"
          alt="Product placeholder"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
        <CustomImage
          src={images[currentImageIndex] || '/logo.svg'}
          alt={`Product image ${currentImageIndex + 1}`}
          fill
          priority={currentImageIndex === 0}
          className="object-cover"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border',
                currentImageIndex === index
                  ? 'ring-2 ring-primary'
                  : 'hover:ring-1 hover:ring-primary'
              )}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`View image ${index + 1}`}
            >
              <CustomImage
                src={image || '/logo.svg'}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
