'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAPI, endpoints } from '@/api';
import { toast } from 'sonner';
import {
  Filters,
  UpdateStatus,
  FetchCategoryListResponse,
  CreateCategoryItem,
} from '@/types';
import { buildQueryParams } from '@/utils';

/**
 * ==========================s
 * 📌 @HOOK useCategoryList
 * ==========================
 *
 * @desc Custom hook to get list of categories
 * @returns {Category[]} List of categories
 */

const fetchCategoriesList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchCategoryListResponse> => {
  try {
    const queryString = buildQueryParams(filters, pageParam);

    // Call API
    const response = await handleAPI(
      `${endpoints.categories}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );

    return response;
  } catch (error) {
    console.error('Error fetching categories list:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useCategoryList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchCategoryListResponse, Error>({
    queryKey: ['categoryList', page, filters, refreshKey],
    queryFn: () => fetchCategoriesList(page, filters),
    enabled: page > 0,
    staleTime: 60000,
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useCreateCategory
 * ==========================
 **/

const CreateCategory = async (newCategory: CreateCategoryItem) => {
  const formData = new FormData();

  for (const key in newCategory) {
    if (Object.prototype.hasOwnProperty.call(newCategory, key)) {
      const value = newCategory[key as keyof CreateCategoryItem];

      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else if (typeof value === 'string') {
        formData.append(key, value);
      }
    }
  }

  try {
    const response = await handleAPI(
      `${endpoints.categories}`,
      'POST',
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating category:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create category'
    );
  }
};

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategory: CreateCategoryItem) => {
      return CreateCategory(newCategory);
    },
    onSuccess: () => {
      toast.success(' Category created successfully!');
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to create  category.');
    },
  });
};

/**
 * ========== END OF @HOOK useCreateCategory ==========
 */

const DeleteCategory = async (categoryId: string) => {
  try {
    if (!endpoints.categoryEdit) {
      throw new Error('Contact endpoint is not defined.');
    }

    const response = await handleAPI(
      `${endpoints.categoryEdit.replace(':id', categoryId)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Category:',
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || 'Failed to delete Category'
    );
  }
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteCategory,
    onSuccess: () => {
      toast.success('Delete Category Success!');
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Category.');
    },
  });
};

const EditStatus = async (updateStatus: UpdateStatus, postId: string) => {
  const formData = new FormData();

  for (const key in updateStatus) {
    if (Object.prototype.hasOwnProperty.call(updateStatus, key)) {
      const value = updateStatus[key as keyof UpdateStatus];

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
    if (!endpoints.categoryStatus) {
      throw null;
    }

    const url = endpoints.categoryStatus.replace(':id', postId);

    const response = await handleAPI(url, 'PATCH', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update service'
    );
  }
};

const useUpdateCategoryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      updateStatus,
      postId,
    }: {
      updateStatus: UpdateStatus;
      postId: string;
    }) => {
      return EditStatus(updateStatus, postId);
    },
    onSuccess: () => {
      toast.success('Update status successfully!');
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
  });
};

export {
  useCategoryList,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategoryStatus,
};
