'use client';

import { ComponentsIcons } from '@/assetts/icons';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';
// import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export function NavUser({
  user,
  logout,
}: {
  user: {
    name: string;
    email: string;
  } | null;
  logout: () => void;
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-black"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <Image src="/Logo.svg" alt="vietsitrx" width={32} height={32} />
                {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
              </Avatar>
              <div className="grid flex-1 text-left data-[state=open]:text-black text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs ">{user?.email}</span>
              </div>
              <ComponentsIcons.ChevronsUpDown className="ml-auto size-4 " />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg bg-white">
                  <Image
                    src="/Logo.svg"
                    alt="vietstrix"
                    width={32}
                    height={32}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/admin/profile">
                <DropdownMenuItem>
                  <ComponentsIcons.CircleUserRound />
                  Profile
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/admin/update_password">
                <DropdownMenuItem>
                  <ComponentsIcons.RectangleEllipsis />
                  Change password
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <ComponentsIcons.LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
