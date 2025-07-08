'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/api';
import {
  FetchManagerListResponse,
  CreateManagerData,
  UserDataStatistic,
} from '@/types/types';
import { toast } from 'sonner';
import { logDebug } from '@/utils/logger';
import { Filters } from '@/types';

/**
 * ==========================
 * 📌 @HOOK useEmployeeList
 * ==========================
 *
 * @desc Custom hook to get list of employee
 * @returns {Employee} List of employee
 */

const fetchUserList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchManagerListResponse> => {
  try {
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== ''
      )
    );

    // Tạo query string từ filters
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters,
    }).toString();

    // Gọi API
    const response = await handleAPI(
      `${endpoints.user}${queryString ? `?${queryString}` : ''}`,
      'GET'
    );
    return response;
  } catch (error) {
    console.error('Error fetching employee list:', error);
    throw error;
  }
};

const useUserList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchManagerListResponse, Error>({
    queryKey: ['userList', page, filters, refreshKey],
    queryFn: () => fetchUserList(page, filters),
    enabled: page > 0, // Bật query nếu page hợp lệ
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useEmployeeList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreate Employee
 * ==========================
 *
 * @desc Custom hook to create employee
 * @returns {Employee} Detail of employee
 */

const createManager = async (managerData: CreateManagerData) => {
  const formData = new FormData();

  for (const key in managerData) {
    if (Object.prototype.hasOwnProperty.call(managerData, key)) {
      const value = managerData[key as keyof CreateManagerData];

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
    const response = await handleAPI(`${endpoints.managers}`, 'POST', formData);

    logDebug('Manager Data:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating manager:', error.response?.data);

    // Extract error messages from response
    const errorMessages = error.response?.data?.message;
    let errorMessage = 'Failed to create manager';

    if (Array.isArray(errorMessages) && errorMessages.length > 0) {
      // Take the first error message
      errorMessage = errorMessages[0];
    } else if (typeof errorMessages === 'string') {
      errorMessage = errorMessages;
    }

    throw new Error(errorMessage);
  }
};

const useCreateManager = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newManage: CreateManagerData) => {
      return createManager(newManage);
    },
    onSuccess: () => {
      toast.success('Create Employee Success!');
      queryClient.invalidateQueries({ queryKey: ['userList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create employee.');
      console.error(error.message || 'Failed to create employee.');
    },
  });
};
/**
 * ========== END OF @HOOK useCreateEmployee ==========
 */

const DeleteManager = async (userID: string) => {
  try {
    if (!endpoints.manager) {
      throw new Error('Manager endpoint is not defined.');
    }

    const response = await handleAPI(
      `${endpoints.manager.replace(':id', userID)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Manager:',
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || 'Failed to delete Manager'
    );
  }
};

const useDeleteManager = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteManager, // Directly pass the function
    onSuccess: () => {
      toast.success('Delete Manager Success!');
      queryClient.invalidateQueries({ queryKey: ['userList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Manager.');
      toast.error(error.message || 'Failed to delete Manager.');
    },
  });
};

const fetchUserStatistic = async (): Promise<UserDataStatistic> => {
  try {
    // Gọi API
    const response = await handleAPI(`${endpoints.userStatistic}`, 'GET');
    return response;
  } catch (error) {
    console.error('Error fetching employee list:', error);
    throw error;
  }
};

const useUserStatistict = (refreshKey: number) => {
  return useQuery<UserDataStatistic, Error>({
    queryKey: ['userList', refreshKey],
    queryFn: () => fetchUserStatistic(),
    staleTime: 60000,
  });
};

export { useUserList, useDeleteManager, useCreateManager, useUserStatistict };
