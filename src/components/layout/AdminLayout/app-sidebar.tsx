'use client';

import * as React from 'react';
import { ComponentsIcons } from '@/assetts/icons';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { NavService } from './nav-services';
import { NavSupport } from './nav-support';
import { NavAdmin } from './nav-admin';
import { useAuthStore } from '@/store/authStore';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin',
      icon: ComponentsIcons.LayoutDashboard,
    },
  ],
  navAdmin: [
    {
      title: 'User',
      url: '/admin/user',
      icon: ComponentsIcons.LayoutDashboard,
    },
    {
      title: 'SEO',
      url: '/admin/seo',
      icon: ComponentsIcons.Search,
    },
  ],
  navService: [
    {
      title: 'Thể Loại',
      url: '/admin/category',
      icon: ComponentsIcons.ChartBarStacked,
    },
    {
      title: 'Bài Viết',
      url: '/admin/blog',
      icon: ComponentsIcons.List,
    },
    {
      title: 'Sản Phẩm',
      url: '/admin/product',
      icon: ComponentsIcons.Package,
    },
    {
      title: 'Dịch Vụ',
      url: '/admin/service',
      icon: ComponentsIcons.Package,
    },
    {
      title: 'Dự Án',
      url: '/admin/project',
      icon: ComponentsIcons.SquareChartGantt,
    },
  ],
  navSupport: [
    {
      title: 'Liên Hệ',
      url: '/admin/contact',
      icon: ComponentsIcons.Contact,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userInfo = useAuthStore((state) => state.userInfo);
  const { logout } = useAuthStore();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />

      <SidebarContent>
        <NavMain items={data.navMain} />
        {userInfo?.role === 'admin' && <SidebarSeparator />}
        {userInfo?.role === 'admin' && <NavAdmin items={data.navAdmin} />}
        <SidebarSeparator />
        <NavService items={data.navService} />
        <SidebarSeparator />
        <NavSupport items={data.navSupport} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser logout={logout} user={userInfo ?? null} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
