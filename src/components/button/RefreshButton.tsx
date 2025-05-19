// components/button/RefreshButton.tsx

import { Button } from '@/components/ui/button';
import { RefreshCcwDot } from 'lucide-react';

interface RefreshButtonProps {
  onClick: () => void;
  className?: string;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  onClick,
  className = '',
}) => {
  return (
    <Button
      onClick={onClick}
      className={`group ml-2 bg-main text-white hover:bg-main-400 transition-all duration-300 ${className}`}
    >
      <RefreshCcwDot className="mr-2 transition-transform duration-300 group-hover:rotate-180" />
      Làm mới
    </Button>
  );
};
