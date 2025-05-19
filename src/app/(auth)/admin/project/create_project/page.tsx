'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Upload, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MultiSelect } from '@/components/pages/admin/project/multi-select';
import { ServiceList } from '@/lib/responses/serviceLib';
import { useCreateProject } from '@/hooks/project/useProject';
import { CreateProjectItem } from '@/types/types';
import { useAuthStore } from '@/store/authStore';
import ContentSection from '@/components/richText/ContentSection';
import Heading from '@/components/design/Heading';
import Image from 'next/image';

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  content: z.string().min(10, {
    message: 'Content must be at least 10 characters.',
  }),
  thumbnail: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
  services: z
    .array(z.string().uuid({ message: 'Each service must be a valid UUID' }))
    .min(1, { message: 'Please select at least one service.' }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  brandName: z.string().min(2, {
    message: 'Brand name must be at least 2 characters.',
  }),
  testimonial: z.string().optional(),
  client: z.string().min(2, {
    message: 'Client name must be at least 2 characters.',
  }),
  link: z.string().url({ message: 'Please enter a valid URL.' }).optional(),
  status: z.string().optional(),
});

export default function CreateProjectPage() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: createProject } = useCreateProject();

  const { services, isLoading, isError } = ServiceList(
    1,
    { limit: 10, status: ['show', 'popular'].join(',') },
    0
  );

  const serviceOptions =
    services?.map((service: any) => ({
      value: service._id, // Confirm this is a UUID
      label: service.title,
    })) || [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      services: [],
      description: '',
      brandName: '',
      testimonial: '',
      client: '',
      link: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      form.setError('thumbnail', {
        type: 'manual',
        message: 'Max file size is 5MB.',
      });
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      form.setError('thumbnail', {
        type: 'manual',
        message: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
      });
      return;
    }

    form.setValue('thumbnail', file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    form.setValue('thumbnail', undefined);
    setImagePreview(null);
  };

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    status: 'draft' | 'show'
  ) => {
    setIsSubmitting(true);

    try {
      // Ensure services remain as an array
      const projectData: CreateProjectItem = {
        title: values.title,
        content: values.content,
        description: values.description,
        service: values.services.map((_id) => _id), // Explicitly map to ensure array format
        file: values.thumbnail as File,
        brand_name: values.brandName,
        client: values.client,
        testimonial: values.testimonial || '',
        link: values.link || null,
        status: status,
      };

      createProject(projectData, {
        onSuccess: () => {
          router.push('/admin/project');
        },
        onError: (error: any) => {
          console.error('Error creating project:', error);
          form.setError('root', {
            type: 'manual',
            message:
              error.message || 'Failed to create project. Please try again.',
          });
        },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      form.setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading services...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-10">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              There was an error loading services. Please try again later.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.refresh()}>Retry</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <Heading
            name="Tạo dự án"
            desc="Thêm một dự án mới vào danh mục của bạn để tăng uy tín. Điền vào tất cả các trường bắt buộc."
          />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => onSubmit(values, 'show'))}
              className="space-y-8"
            >
              {' '}
              {form.formState.errors.root && (
                <div className="text-red-500 text-sm">
                  {form.formState.errors.root.message}
                </div>
              )}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên dự án</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
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
                    <FormLabel>Mô tả ngắn</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a short content or summary"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will appear as a preview of your blog post
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field: { ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div
                          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors ${
                            imagePreview
                              ? 'border-muted'
                              : 'border-muted-foreground/20'
                          }`}
                          onClick={() =>
                            document.getElementById('thumbnail-upload')?.click()
                          }
                        >
                          {!imagePreview ? (
                            <>
                              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground mb-1">
                                Drag and drop an image, or click to browse
                              </p>
                              <p className="text-xs text-muted-foreground">
                                JPG, PNG, WebP up to 5MB
                              </p>
                            </>
                          ) : (
                            <div className="relative w-full">
                              <Image
                                src={imagePreview || '/placeholder.svg'}
                                alt="Thumbnail preview"
                                width={300}
                                height={300}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage();
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                          <Input
                            id="thumbnail-upload"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            className="hidden"
                            onChange={handleImageChange}
                            name={fieldProps.name}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="services"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dịch vụ</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={serviceOptions}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select services"
                      />
                    </FormControl>
                    <FormDescription>
                      Select all services that were involved in this project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả chi tiết dự án</FormLabel>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="brandName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên công ty</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter brand name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Khách hàng</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter client name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="testimonial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dánh giá</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter client feedback or testimonial"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link (Nếu có)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    {isSubmitting ? 'Saving...' : 'Lưu nháp'}
                  </Button>
                  {userInfo?.role === 'admin' && (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isSubmitting ? 'Creating...' : 'Tạo dự án'}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
