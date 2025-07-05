'use client';

import React from 'react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/utils/helpers/utils';
import { useCreateService } from '@/hooks/service/useService';
import { CreateServiceItem } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import ContentSection from '@/components/richText/ContentSection';
import Heading from '@/components/design/Heading';
import Image from 'next/image';
import { CategoryList } from '@/lib/responses/categoriesLib';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  content: z.string().min(1, { message: 'Content is required.' }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Price must be a number.',
  }),
  category: z.string().min(1, 'Category is required'),
  status: z.string().optional(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
  file: z.instanceof(File).optional(),
});

export default function NewServiceForm() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const router = useRouter();
  const [displayPrice, setDisplayPrice] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { mutate: createService } = useCreateService();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { categories, isLoading, isError } = CategoryList(
    1,
    { limit: 20, type: 'services' },
    0
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      price: '0',
      status: 'draft',
      description: '',
      category: '',
    },
  });

  function onSubmit(
    values: z.infer<typeof formSchema>,
    status: 'draft' | 'show'
  ) {
    setIsSubmitting(true);
    try {
      // Create service data with the specified status
      const serviceData: CreateServiceItem = {
        title: values.title,
        content: values.content,
        description: values.description,
        file: values.file as File,
        category: values.category,
        status: status,
        price: values.price,
      };

      createService(serviceData, {
        onSuccess: () => {
          router.push('/admin/service');
        },
        onError: (error: any) => {
          console.error('Error creating service:', error);
          form.setError('root', {
            type: 'manual',
            message:
              error.message || 'Failed to create service. Please try again.',
          });
        },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      form.setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.',
      });
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('file', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  React.useEffect(() => {
    // Nếu form chưa load xong hoặc price rỗng thì set ''
    if (!form.getValues('price')) {
      setDisplayPrice('');
      return;
    }

    const formatVND = (value: number | string) => {
      const number = Number(value);
      return number.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
      });
    };

    setDisplayPrice(formatVND(form.getValues('price')));
  }, [form.watch('price')]); // watch để cập nhật khi price thay đổi

  // Hàm xử lý khi user nhập giá trị
  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value.replace(/[^\d]/g, ''); // giữ số thôi
    const numberValue = Number(rawValue);
    setDisplayPrice(rawValue ? numberValue.toLocaleString('vi-VN') + ' ₫' : '');
    form.setValue('price', rawValue || '0');
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (
      file &&
      (file.type === 'image/jpeg' || file.type === 'image/png') &&
      file.size <= 5 * 1024 * 1024
    ) {
      form.setValue('file', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <Heading
          name="Tạo dịch vụ mới"
          desc="Điền thông tin bên dưới để đăng dịch vụ mới."
        />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => onSubmit(values, 'show'))}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div>
                <div className="grid gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiêu đề</FormLabel>
                        <FormDescription>
                          Nhập tiêu đề cho dịch vụ{' '}
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="Enter blog post title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nội dung ngắn</FormLabel>
                        <FormDescription>
                          Nhập nội dung bài đăng dịch vụ
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="Enter blog post content"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={() => (
                      <FormItem>
                        <FormLabel>Giá (VND)</FormLabel>
                        <FormDescription>
                          Đặt giá cho dịch vụ này (0 để liên hệ)
                        </FormDescription>
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="0"
                            value={displayPrice}
                            onChange={handlePriceChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả chi tiết</FormLabel>
                        <FormControl>
                          <ContentSection
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thể Loại</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isLoading
                                ? 'Loading categories...'
                                : 'Select a category'
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading categories...
                          </SelectItem>
                        ) : isError ? (
                          <SelectItem value="error" disabled>
                            Error loading categories
                          </SelectItem>
                        ) : categories && categories.length > 0 ? (
                          categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-categories" disabled>
                            No categories available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {isError && (
                      <p className="text-sm text-red-500 mt-1">
                        Failed to load categories
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  📁 Tải ảnh
                </h2>
                <div className="mt-4">
                  <div
                    className={cn(
                      'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                      isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-muted-foreground/25 hover:border-primary/50'
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() =>
                      document.getElementById('image-upload')?.click()
                    }
                  >
                    {imagePreview ? (
                      <div className="relative mx-auto max-w-xs">
                        <Image
                          className="h-10 w-10 text-muted-foreground"
                          src={imagePreview || '/placeholder.svg'}
                          alt="Preview"
                          width={200}
                          height={200}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImagePreview(null);
                            form.setValue('file', undefined);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="h-10 w-10 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            Drag & drop an image here, or click to upload
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Recommended format: JPG, PNG, Max size: 5MB
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <CardFooter className="flex justify-between gap-4 px-0">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Hủy
              </Button>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const values = form.getValues();
                    onSubmit(values, 'draft'); // Set status to 'draft'
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Lưu nháp'}
                </Button>
                {userInfo?.role === 'admin' && (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? 'Creating...' : 'Khởi tạo dịch vụ'}
                  </Button>
                )}
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
