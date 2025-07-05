'use client';

import ScrollToTopButton from '@/components/button/ScrollToTopButton';
import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';
import { RadiatingLoader } from '@/components';
import React, { useEffect, useState } from 'react';

export default function CustomerLayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <RadiatingLoader />;
  }
  return (
    <div>
      <DefaultLayout>
        <div>{children}</div>
        <ScrollToTopButton />
      </DefaultLayout>
    </div>
  );
}
