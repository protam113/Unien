'use client';

import React, { ReactNode } from 'react';
import { AppSidebar } from './app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Footer from './adminFooter';

interface DefaultLayoutProps {
  children: ReactNode; // Khai báo kiểu cho children
}

const AdminLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    // Trong DefaultLayout.tsx
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="relative flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>

        <main className="flex-1 ml-8">
          {/* <Breadcrumb /> */}
          <div>{children}</div>
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
