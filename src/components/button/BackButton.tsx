'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ComponentsIcons } from '@/assetts/icons';
import { BackButtonProps } from '@/types';

export const BackButton: React.FC<BackButtonProps> = ({ href }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push(href);
  };

  return (
    <button
      onClick={handleBack}
      className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-main transition-colors"
    >
      <ComponentsIcons.ArrowLeft className="h-4 w-4" />
      <span className="text-sm">Quay lại</span>
    </button>
  );
};
