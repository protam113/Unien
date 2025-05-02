import React from 'react';

interface SectionHeaderProps {
  title: string;
  design?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, design }) => {
  return (
    <h2 className="text-4xl font-bold text-[#F69429] uppercase mt-4 mb-4 flex items-center gap-2">
      {title}{' '}
      {design && (
        <span className="font-semibold font-montserrat">{design}</span>
      )}
    </h2>
  );
};

export default SectionHeader;
