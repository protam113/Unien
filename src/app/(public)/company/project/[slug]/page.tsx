'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

const PageRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/company');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoaderCircle className="h-10 w-10 animate-spin text-blue-500" />
    </div>
  );
};

export default PageRedirect;
