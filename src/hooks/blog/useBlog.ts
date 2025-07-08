import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateBlogItem, BlogDetail } from '@/types/types';
import { Filters, UpdateStatus, FetchBlogListResponse } from '@/types';
import { handleAPI, endpoints } from '@/api';
import { toast } from 'sonner';
import { buildQueryParams } from '@/utils';

/**
 * ==========================
 * 📌 @HOOK useCategoryList
 * ==========================
 *
 * @description  Custom hook to get list of blog
 * @returns {Blog[
 * _id: string;
 * title: string;
 * content: string;
 * description: string;
 * file: string;
 * link: string;
 * slug: string;
 * user?: UserDataComponents;
 * category: ChildCategory;
 * status: string;
 * createdAt: string | Date;
 * updatedAt: string | Date;
 * ]} List of blog
 */

const fetchBlogList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchBlogListResponse> => {
  try {
    const queryString = buildQueryParams(filters, pageParam);

    // Call API
    const response = await handleAPI(
      `${endpoints.blogs}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null
    );

    return response;
  } catch (error) {
    console.error('Error fetching blog list:', error);
    throw error;
  }
};

/**
 * Custom hook to get list of categories using React Query.
 */
const useBlogList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchBlogListResponse, Error>({
    queryKey: ['blogList', page, filters, refreshKey],
    queryFn: () => fetchBlogList(page, filters),
    enabled: page > 0,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
    gcTime: 30 * 60 * 1000, //
  });
};

/**
 * ========== END OF @HOOK useCategoriesList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useBlogDetail
 * ==========================
 *
 * @desc Custom hook to get detail of blog
 * @param {string} slug Slug of blog
 * @returns {Blog} Detail of blog
 */

const fetchBlogDetail = async (slug: string): Promise<BlogDetail> => {
  try {
    // Check if slug is valid
    if (!slug) {
      throw new Error('Slug is required');
    }
    // Check if endpoint is valid
    if (!endpoints.blogDetail) {
      throw null;
    }
    // Call API
    const response = await handleAPI(
      `${endpoints.blogDetail.replace(':slug', slug)}`,
      'GET',
      null
    );
    return response;
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    throw error;
  }
};

// Custom hook to get detail of blog
const useBlogDetail = (slug: string, refreshKey: number) => {
  return useQuery<BlogDetail, Error>({
    queryKey: ['blogDetail', slug, refreshKey],
    queryFn: () => fetchBlogDetail(slug),
    enabled: !!slug,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

/**
 * ========== END OF @HOOK useBlogDetail ==========
 */

const DeleteBlog = async (blogID: string) => {
  try {
    if (!endpoints.blog) {
      throw new Error('blog endpoint is not defined.');
    }

    const response = await handleAPI(
      `${endpoints.blog.replace(':id', blogID)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Blog:',
      error?.response?.data || error.message
    );
    throw new Error(error?.response?.data?.message || 'Failed to delete Blog');
  }
};

const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteBlog,
    onSuccess: () => {
      toast.success('Delete Blog Success!');
      queryClient.invalidateQueries({ queryKey: ['blogList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Blog.');
      toast.error(error.message || 'Đã có lỗi xảy ra khi xóa.');
    },
  });
};

const EditStatus = async (updateStatus: UpdateStatus, postId: string) => {
  const formData = new FormData();

  for (const key in updateStatus) {
    if (Object.prototype.hasOwnProperty.call(updateStatus, key)) {
      const value = updateStatus[key as keyof UpdateStatus];

      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else if (typeof value === 'string') {
        formData.append(key, value);
      }
    }
  }

  try {
    if (!endpoints.blogStatus) {
      throw null;
    }

    const url = endpoints.blogStatus.replace(':id', postId);

    const response = await handleAPI(url, 'PATCH', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update service'
    );
  }
};

const useUpdateBlogStatus = () => {
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
      queryClient.invalidateQueries({ queryKey: ['blogList'] });
    },
  });
};

const CreateBlog = async (newBlog: CreateBlogItem) => {
  const formData = new FormData();

  for (const key in newBlog) {
    const value = newBlog[key as keyof CreateBlogItem];

    if (key === 'file' && Array.isArray(value)) {
      value.forEach((file) => formData.append('file', file));
    } else if (value) {
      // Thêm các trường khác
      formData.append(key, value as string);
    }
  }

  try {
    const response = await handleAPI(`${endpoints.blogs}`, 'POST', formData);

    return response.data;
  } catch (error: any) {
    console.error('Error creating blog:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to create blog');
  }
};

const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBlog: CreateBlogItem) => {
      return CreateBlog(newBlog);
    },
    onSuccess: () => {
      toast.success('Tạo bài viết thành công!');
      queryClient.invalidateQueries({ queryKey: ['blogList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Đã có lỗi xảy ra khi tạo.');
      console.error(error.message || 'Failed to create blog.');
    },
  });
};

export {
  useBlogList,
  useBlogDetail,
  useDeleteBlog,
  useUpdateBlogStatus,
  useCreateBlog,
};
