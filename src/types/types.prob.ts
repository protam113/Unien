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

export interface NoResultsFoundProps {
  title?: string;
  message?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: string;
  description: string;
  onConfirm: () => void;
}

/**
 * ==========================
 * @PushButtonProps
 * ==========================
 */ export interface PushButtonProps {
  href: string;
  label: string;
}
