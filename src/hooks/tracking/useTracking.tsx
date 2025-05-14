'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from '@/api/api';
import { Filters, AnalyticsData, CreateTracing } from '@/types/types';
import { handleAPI } from '@/api/axiosClient';
import { logDebug } from '@/utils/logger';

/**
 * ==========================s
 * 📌 @HOOK useCategoryList
 * ==========================
 *
 * @desc Custom hook to get list of categories
 * @returns {Category[]} List of categories
 */

const fetchTrackingData = async (
  pageParam: number = 1,
  filters: Filters
): Promise<AnalyticsData> => {
  try {
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== ''
      )
    );

    // Create query string from filters
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters,
    }).toString();

    // Call API
    const response = await handleAPI(
      `${endpoints.tracking}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );
    logDebug(handleAPI);

    return response;
  } catch (error) {
    console.error('Error fetching logs data:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useTrackingData = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<AnalyticsData, Error>({
    queryKey: ['trackingData', page, filters, refreshKey],
    queryFn: () => fetchTrackingData(page, filters),
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

const CreateTracking = async (newTracking: CreateTracing) => {
  const formData = new FormData();

  for (const key in newTracking) {
    if (Object.prototype.hasOwnProperty.call(newTracking, key)) {
      const value = newTracking[key as keyof CreateTracing];

      if (Array.isArray(value)) {
        // If the value is an array, append each element
        value.forEach((v) => formData.append(key, v));
      } else if (typeof value === 'string') {
        // If the value is a string, append to FormData
        formData.append(key, value);
      }
    }
  }

  try {
    const response = await handleAPI(
      `${endpoints.trackingApi}`,
      'POST',
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating contact:', error.response?.data);
    logDebug('🐞 Data:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create contact'
    );
  }
};

const useTracking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTracking: CreateTracing) => {
      return CreateTracking(newTracking);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trackingData'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to create  contact.');
      logDebug('🐞 Data:', error.message);
    },
  });
};
export { useTrackingData, useTracking };
