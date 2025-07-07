import { SectionHeaderProps } from '@/types';
import React from 'react';

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  design,
}) => {
  return (
    <h2 className="text-4xl font-bold text-main uppercase mt-4 mb-4 flex items-center gap-2">
      <div className="h-1 w-6 bg-main"></div>
      {title}{' '}
      {design && (
        <span className="font-semibold font-montserrat">{design}</span>
      )}
    </h2>
  );
};
