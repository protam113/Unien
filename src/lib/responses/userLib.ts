'use client';

import { useUserList, useUserStatistict } from '@/hooks/auth/useManager';
import { Filters } from '@/types/types';

export const UserList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useUserList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? {
    current_page: 1,
    total_page: 1,
    total: 0,
  };

  const users = data?.results ?? [];

  return {
    users,
    isLoading,
    isError,
    pagination,
  };
};

export const UserStatistict = (refreshKey: number) => {
  const { data, isLoading, isError } = useUserStatistict(refreshKey);

  return {
    data,
    isLoading,
    isError,
  };
};
