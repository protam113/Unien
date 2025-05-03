'use client';

import ScrollToTopButton from '@/components/button/ScrollToTopButton';
import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';
import RadiatingLoader from '@/components/loading/radiating-loader';
import React, { useEffect, useState } from 'react';

export default function CustomerLayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Đợi 3 giây rồi tắt loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer); // Cleanup nếu component unmount
  }, []);

  if (isLoading) {
    return <RadiatingLoader />; // Hiển thị loading trước khi trang load xong
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
