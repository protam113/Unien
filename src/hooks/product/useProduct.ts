import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/api';
import { toast } from 'sonner';
import { logDebug } from '@/utils/logger';
import {
  UpdateStatus,
  Filters,
  FetchProductListResponse,
  ProductDetailResponse,
  CreateProductItem,
} from '@/types';
import { buildQueryParams } from '@/utils';

/**
 * ==========================
 * 📌 @HOOK useServiceList
 * ==========================
 *
 * @desc Custom hook to get list of services
 * @returns {Products[]} List of services
 */

const fetchProductList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchProductListResponse> => {
  try {
    // Check if endpoint is valid
    const queryString = buildQueryParams(filters, pageParam);

    // Call API
    const response = await handleAPI(
      `${endpoints.products}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );
    logDebug(handleAPI);

    return response;
  } catch (error) {
    console.error('Error fetching categories list:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useProductList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchProductListResponse, Error>({
    queryKey: ['productList', page, filters, refreshKey],
    queryFn: () => fetchProductList(page, filters),
    enabled: page > 0,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
    gcTime: 30 * 60 * 1000, //
  });
};

/**
 * ========== END OF @HOOK useServiceList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useDocumentDetail
 * ==========================
 *
 * @desc Custom hook to get detail of document
 * @param {string} slug Slug of document
 * @returns {Document} Detail of document
 */

const fetchProductDetail = async (
  slug: string
): Promise<ProductDetailResponse> => {
  try {
    // Check if slug is valid
    if (!slug) {
      throw new Error('Slug is required');
    }
    // Check if endpoint is valid
    if (!endpoints.productDetail) {
      throw null;
    }
    // Call API
    const response = await handleAPI(
      `${endpoints.productDetail.replace(':slug', slug)}`,
      'GET',
      null
    );
    return response;
  } catch (error) {
    console.error('Error fetching post detail:', error);
    throw error;
  }
};

// Custom hook to get detail of category
const useProductDetail = (slug: string, refreshKey: number) => {
  return useQuery<ProductDetailResponse, Error>({
    queryKey: ['productDetail', slug, refreshKey],
    queryFn: () => fetchProductDetail(slug),
    enabled: !!slug,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

/**
 * ========== END OF @HOOK useBlogDetail ==========
 */

const DeleteProduct = async (serviceID: string) => {
  try {
    if (!endpoints.product) {
      throw new Error('Product endpoint is not defined.');
    }

    const response = await handleAPI(
      `${endpoints.product.replace(':id', serviceID)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Product:',
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || 'Failed to delete Product'
    );
  }
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteProduct, // Directly pass the function
    onSuccess: () => {
      toast.success('Delete Product Success!');
      queryClient.invalidateQueries({ queryKey: ['productList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Product.');
      toast.error(error.message || 'Failed to delete Product.');
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
    if (!endpoints.productStatus) {
      throw null;
    }

    const url = endpoints.productStatus.replace(':id', postId);

    const response = await handleAPI(url, 'PATCH', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update product'
    );
  }
};

const useUpdateProductStatus = () => {
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
      queryClient.invalidateQueries({ queryKey: ['productList'] });
    },
  });
};

const CreateProduct = async (newPost: CreateProductItem) => {
  const formData = new FormData();

  for (const key in newPost) {
    const value = newPost[key as keyof CreateProductItem];

    if (Array.isArray(value) && value[0] instanceof File) {
      value.forEach((file) => {
        formData.append('files', file);
      });
    } else if (value instanceof File) {
      formData.append('files', value); // fallback nếu chỉ là 1 file
    } else if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  }

  try {
    const response = await handleAPI(`${endpoints.products}`, 'POST', formData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating Product:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create Product'
    );
  }
};

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPost: CreateProductItem) => {
      return CreateProduct(newPost);
    },
    onSuccess: () => {
      toast.success('Create Product Success!');
      queryClient.invalidateQueries({ queryKey: ['productList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create Product.');
      console.error(error.message || 'Failed to create Product.');
    },
  });
};

export {
  useProductList,
  useProductDetail,
  useDeleteProduct,
  useUpdateProductStatus,
  useCreateProduct,
};
