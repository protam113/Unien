'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/configs/react-query.config';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
