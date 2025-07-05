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
import { Loader2, Trash2, Upload } from 'lucide-react';
import { cn } from '@/utils/helpers/utils';
import { CreateProductItem } from '@/types/types';
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
import { useCreateProduct } from '@/hooks/product/useProduct';

// schema.ts
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
});

export default function Page() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const router = useRouter();
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const { mutate: createService } = useCreateProduct();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayPrice, setDisplayPrice] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const { categories, isLoading, isError } = CategoryList(
    1,
    { limit: 20, type: 'products' },
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
      const serviceData: CreateProductItem = {
        title: values.title,
        content: values.content,
        description: values.description,
        files: files,
        category: values.category,
        status: status,
        price: values.price,
      };

      createService(serviceData, {
        onSuccess: () => {
          form.reset();
          setFiles([]);
          setPreviewIndex(null);
          router.push('/admin/product');
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);

      // Set the first uploaded image as preview if none is selected
      if (previewIndex === null) {
        setPreviewIndex(0);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);

      // Adjust preview index if needed
      if (previewIndex === index) {
        setPreviewIndex(newFiles.length > 0 ? 0 : null);
      } else if (previewIndex !== null && previewIndex > index) {
        setPreviewIndex(previewIndex - 1);
      }

      return newFiles;
    });
  };

  const setAsPreview = (index: number) => {
    setPreviewIndex(index);
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

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <Heading
          name="Create New Service"
          desc="Fill in the details below to publish a new service."
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
                        <FormLabel>Tên Sản Phẩm</FormLabel>
                        <FormDescription>
                          Enter a clear and concise title for the service
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
                        <FormLabel>Mô Tả Ngắn</FormLabel>
                        <FormDescription>
                          Enter blog post Contnet
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
                        <FormLabel>Description</FormLabel>
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
                    <FormLabel>Category</FormLabel>
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
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium mb-2">Ảnh Sản Phẩm</h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Drag and drop files or click to browse
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG, GIF up to 10MB
                      </p>
                    </label>
                  </div>
                </div>

                {files.length > 0 && (
                  <div>
                    <h3 className="text-md font-medium mb-2">
                      Preview Image{' '}
                      {previewIndex !== null && `(${previewIndex + 1})`}
                    </h3>
                    {previewIndex !== null && (
                      <div className="relative aspect-video mb-4 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={
                            URL.createObjectURL(files[previewIndex]) ||
                            '/placeholder.svg'
                          }
                          alt="Preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}

                    <h3 className="text-md font-medium mb-2">
                      Uploaded Images ({files.length})
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {files.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className={cn(
                            'relative group aspect-square rounded-md overflow-hidden border-2',
                            previewIndex === index
                              ? 'border-primary'
                              : 'border-gray-200'
                          )}
                        >
                          <Image
                            src={
                              URL.createObjectURL(file) || '/placeholder.svg'
                            }
                            alt={`Image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="secondary"
                              className="h-8 text-xs"
                              onClick={() => setAsPreview(index)}
                            >
                              Set as preview
                            </Button>
                            <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              className="h-8 w-8"
                              onClick={() => removeFile(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                          {previewIndex === index && (
                            <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-sm">
                              Preview
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <CardFooter className="flex justify-between gap-4 px-0">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Cancel
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
                  {isSubmitting ? 'Saving...' : 'Save as Draft'}
                </Button>
                {userInfo?.role === 'admin' && (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? 'Creating...' : 'Create Blog'}
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
