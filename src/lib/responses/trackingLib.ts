'use client';

import { useTrackingData } from '@/hooks/tracking/useTracking';
import { Filters } from '@/types/types';

export const TrackingList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useTrackingData(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  const trackings = data?.results ?? [];

  return {
    trackings,
    isLoading,
    isError,
    pagination,
  };
};
