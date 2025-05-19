'use client';

import React, { useState } from 'react';
import BackButton from '@/components/button/BackButton';
import Container from '@/components/container/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateManagerData } from '@/types/types';
import { toast } from 'sonner';
import { useCreateManager } from '@/hooks/auth/useManager';
import Heading from '@/components/design/Heading';

const Page = () => {
  const { mutate: createManager } = useCreateManager();
  const [managerData, setManagerData] = useState<CreateManagerData>({
    username: '',
    name: '',
    email: '',
    password: '',
    phone_number: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateManagerData, string>>
  >({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CreateManagerData, string>> = {};
    let isValid = true;

    // Validate username
    if (!managerData.username.trim()) {
      newErrors.username = 'Tên đăng nhậ là bắt buộc';
      isValid = false;
    }

    // Validate name
    if (!managerData.name.trim()) {
      newErrors.name = 'Tên là bắt buộc';
      isValid = false;
    }

    // Validate email
    if (!managerData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(managerData.email)) {
      newErrors.email = 'Email không hợp lệ';
      isValid = false;
    }

    // Validate password
    if (!managerData.password.trim()) {
      newErrors.password = 'Mật khẩu là bắt buộc';
      isValid = false;
    } else if (managerData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      isValid = false;
    }

    // Validate phone number
    if (!managerData.phone_number.trim()) {
      newErrors.phone_number = 'Số điện thoại là bắt buộc';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateManager = async () => {
    if (!validateForm()) {
      toast.error('Vui lòng sửa lỗi xác thực');
      return;
    }

    setLoading(true);

    try {
      await createManager(managerData);
      // Reset state
      setManagerData({
        username: '',
        name: '',
        email: '',
        password: '',
        phone_number: '',
      });
      // Optionally navigate to another page
      // router.push('/managers');
    } catch (error) {
      console.error(error);
      // Error is already handled by the mutation hook
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManagerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof CreateManagerData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <Container>
      <BackButton />
      <div className="flex justify-between items-center">
        <Heading name="Tạo quản trị viên" desc="Tạo tài khoản quản lý mới" />
        <Button onClick={handleCreateManager} disabled={loading}>
          {loading ? 'Creating...' : 'Tạo'}
        </Button>
      </div>
      <form
        className="flex flex-col space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateManager();
        }}
      >
        {[
          { label: 'Tên đăng nhập', name: 'username' },
          { label: 'Tên', name: 'name' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Số điện thoại', name: 'phone_number' },
        ].map(({ label, name, type = 'text' }) => (
          <div
            key={name}
            className="mt-4 grid grid-cols-[150px_1fr] items-center gap-4"
          >
            <Label className="text-right" htmlFor={name}>
              {label}
            </Label>
            <div className="flex flex-col w-full">
              <Input
                id={name}
                type={type}
                name={name}
                value={managerData[name as keyof CreateManagerData] as string}
                onChange={handleInputChange}
                required
                placeholder={`Enter manager ${label.toLowerCase()}`}
                className={
                  errors[name as keyof CreateManagerData]
                    ? 'border-red-500'
                    : ''
                }
              />
              {errors[name as keyof CreateManagerData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[name as keyof CreateManagerData]}
                </p>
              )}
            </div>
          </div>
        ))}
      </form>
    </Container>
  );
};

export default Page;
