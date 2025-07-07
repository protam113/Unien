import { ReactNode } from 'react';

export interface LoadingProps {
  size?: number;
  message?: string;
  className?: string;
}

export interface SectionHeaderProps {
  title: string;
  design?: string;
}

export interface ProcessStepProps {
  title: string;
  startPosition: string;
  color: string;
  width: string;
  delay: number;
  row: 'top' | 'bottom';
  isVisible: boolean;
}

export interface ContactSectionProps {
  href: string;
  title: string;
}

export interface CardProps {
  type: string;
  _id: string;
  title: string;
  slug: string;
  content: string;
  file: string;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export type BackButtonProps = {
  href: string;
};
