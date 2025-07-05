// components/Error.tsx
import type { LoadingProps } from '@/types';
import Container from '../wrappers/Container';
import { Icons } from '@/assetts/icons';

export const ErrorLoading: React.FC<LoadingProps> = ({
  size = 32,
  message = 'Không thể tải dữ liệu. Vui lòng thử lại sau.',
  className = '',
}) => {
  return (
    <Container
      className={`min-h-screen flex flex-col items-center justify-center gap-2 p-4 ${className}`}
    >
      <div className="col-span-full flex justify-center items-center py-10 text-red-500">
        <Icons.AlertTriangle className="h-5 w-5 mr-2" size={size} />
        <span>{message}</span>
      </div>
    </Container>
  );
};
