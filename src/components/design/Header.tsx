import { HeaderProps } from '@/types/types';
import React from 'react';

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <div
      className={`mb-6 bg-orange-400  text-white text-lg font-semibold px-4 py-2 rounded-lg ${className}`}
    >
      {title}
    </div>
  );
};

export default Header;
