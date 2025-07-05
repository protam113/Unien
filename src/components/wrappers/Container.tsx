import { ContainerProps } from '@/types';

export function Container({ children, className }: ContainerProps) {
  return (
    <main className={`w-full mx-auto container py-4  ${className}`}>
      {children}
    </main>
  );
}
