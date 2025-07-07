import type { ImageProps } from 'next/image';

export interface CustomImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  imageKey?: string;
  src: ImageProps['src'];
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  quality?: number;
  priority?: boolean;
  className?: string;
}

export interface ImageViewerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export interface ProductGalleryProps {
  images: string[];
}
