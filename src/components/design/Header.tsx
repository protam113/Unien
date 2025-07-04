import { HeaderProps } from '@/types/types';
import React from 'react';

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <div
      className={`mb-6 bg-main  text-white text-lg font-semibold px-4 py-2 ${className}`}
    >
      {title}
    </div>
  );
};

export default Header;
