'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpin } from '@/components';

const PageRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/company');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSpin />
    </div>
  );
};

export default PageRedirect;
