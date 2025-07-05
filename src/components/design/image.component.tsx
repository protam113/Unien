import type { CustomImageProps } from '@/types';
import Image from 'next/image';

export function CustomImage({
  imageKey,
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  loading,
  quality = 75,
  priority = false,
  className,
  ...rest
}: CustomImageProps) {
  if (process.env.NODE_ENV === 'development' && priority && loading) {
    console.warn(
      `CustomImage: Both "priority" and "loading" were passed. "loading" will be ignored.`
    );
  }

  return (
    <Image
      key={imageKey}
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      quality={quality}
      priority={priority}
      loading={priority ? undefined : (loading ?? 'lazy')}
      className={className}
      placeholder="blur"
      blurDataURL="/placeholder.png"
      {...rest}
    />
  );
}
