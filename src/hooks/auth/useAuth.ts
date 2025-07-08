import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangePassword, VerifyCode } from '@/types/types';
import { endpoints, handleAPI } from '@/api';

const ChangePasswordAuth = async (changePassword: ChangePassword) => {
  const formData = new FormData();

  for (const key in changePassword) {
    const value = changePassword[key as keyof ChangePassword];

    if (value) {
      formData.append(key, value as string);
    }
  }

  try {
    // Gửi FormData tới backend
    const response = await handleAPI(
      `${endpoints.changePassword}`,
      'POST',
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error('Error change password:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to change password'
    );
  }
};

const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (changePassword: ChangePassword) => {
      return ChangePasswordAuth(changePassword);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
    onError: (error) => {
      console.log(error.message || 'Failed to change password.');
    },
  });
};

const GetVerifyCode = async (verifyCode: VerifyCode) => {
  const formData = new FormData();

  for (const key in verifyCode) {
    const value = verifyCode[key as keyof VerifyCode];

    if (value) {
      formData.append(key, value as string);
    }
  }
  try {
    const response = await handleAPI(
      `${endpoints.verifyCode}`,
      'POST',
      formData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to check verify code'
    );
  }
};

const useGetVerifyCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (verifyCode: VerifyCode) => {
      return GetVerifyCode(verifyCode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifyCode'] });
    },
    onError: (error) => {
      console.log(error.message || 'Failed to verify code.');
    },
  });
};

export { useChangePassword, useGetVerifyCode };
