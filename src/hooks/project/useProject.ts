import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FetchProjectListResponse,
  ProjectDetailResponse,
  CreateProjectItem,
} from '@/types/types';
import { endpoints, handleAPI } from '@/api';
import { toast } from 'sonner';
import { logDebug } from '@/utils/logger';
import { UpdateStatus, Filters } from '@/types';
import { buildQueryParams } from '@/utils';

/**
 * ==========================
 * 📌 @HOOK useProjectList
 * ==========================
 *
 * @desc Custom hook to get list of services
 * @returns {PROJECT[]} List of services
 */

const fetchProjectList = async (
  pageParam: number = 1,
  filters: Filters
): Promise<FetchProjectListResponse> => {
  try {
    // Check if endpoint is valid
    const queryString = buildQueryParams(filters, pageParam);

    // Call API
    const response = await handleAPI(
      `${endpoints.projects}${queryString ? `?${queryString}` : ''}`,
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
const useProjectList = (
  page: number,
  filters: Filters = {},
  refreshKey: number
) => {
  return useQuery<FetchProjectListResponse, Error>({
    queryKey: ['projectList', page, filters, refreshKey],
    queryFn: () => fetchProjectList(page, filters),
    enabled: page > 0,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
    gcTime: 30 * 60 * 1000, //
  });
};

/**
 * ========== END OF @HOOK useProjectList ==========
 */

/**
 * ==========================
 * 📌 @HOOK useProjectDetail
 * ==========================
 *
 * @desc Custom hook to get detail of document
 * @param {string} slug Slug of document
 * @returns {Document} Detail of document
 */

const fetchProjectDetail = async (
  slug: string
): Promise<ProjectDetailResponse> => {
  try {
    // Check if slug is valid
    if (!slug) {
      throw new Error('Slug is required');
    }
    // Check if endpoint is valid
    if (!endpoints.projectDetail) {
      throw null;
    }
    // Call API
    const response = await handleAPI(
      `${endpoints.projectDetail.replace(':slug', slug)}`,
      'GET',
      null
    );
    return response;
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    throw error;
  }
};

// Custom hook to get detail of category
const useProjectDetail = (slug: string, refreshKey: number) => {
  return useQuery<ProjectDetailResponse, Error>({
    queryKey: ['projectDetail', slug, refreshKey],
    queryFn: () => fetchProjectDetail(slug),
    enabled: !!slug,
    staleTime: process.env.NODE_ENV === 'development' ? 1000 : 300000,
  });
};

/**
 * ========== END OF @HOOK useProjectDetail ==========
 */

const DeleteProject = async (projectID: string) => {
  try {
    if (!endpoints.project) {
      throw new Error('Project endpoint is not defined.');
    }

    const response = await handleAPI(
      `${endpoints.project.replace(':id', projectID)}`,
      'DELETE'
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error deleting Service:',
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.message || 'Failed to delete Project'
    );
  }
};

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteProject, // Directly pass the function
    onSuccess: () => {
      toast.success('Delete Project Success!');
      queryClient.invalidateQueries({ queryKey: ['projectList'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to delete Project.');
      toast.error(error.message || 'Failed to delete Project.');
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
    if (!endpoints.projectStatus) {
      throw null;
    }

    const url = endpoints.projectStatus.replace(':id', postId);

    const response = await handleAPI(url, 'PATCH', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to update service'
    );
  }
};

const useUpdateProjectStatus = () => {
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
      queryClient.invalidateQueries({ queryKey: ['projectList'] });
    },
  });
};

const CreateProject = async (newPost: CreateProjectItem) => {
  const formData = new FormData();

  for (const key in newPost) {
    const value = newPost[key as keyof CreateProjectItem];

    if (key === 'service' && Array.isArray(value)) {
      value.forEach((serviceId) => {
        formData.append('service', serviceId);
      });
    } else if (value instanceof File) {
      formData.append('file', value);
    } else if (value) {
      formData.append(key, value as string);
    }
  }

  try {
    const response = await handleAPI(`${endpoints.projects}`, 'POST', formData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating project:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create project'
    );
  }
};

const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPost: CreateProjectItem) => {
      return CreateProject(newPost);
    },
    onSuccess: () => {
      toast.success('Create Project Success!');
      queryClient.invalidateQueries({ queryKey: ['projectList'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create project.');
      console.error(error.message || 'Failed to create project.');
    },
  });
};

export {
  useProjectList,
  useProjectDetail,
  useDeleteProject,
  useUpdateProjectStatus,
  useCreateProject,
};
