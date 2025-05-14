'use client';

import type React from 'react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
  Underline,
  ImageIcon,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCreateService } from '@/hooks/service/useService';
import { CreateServiceItem } from '@/types/types';
import { useRouter } from 'next/navigation';
import Heading from '@/components/pages/heading/Heading';
import { useAuthStore } from '@/store/authStore';
import ContentSection from '@/components/richText/ContentSection';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  content: z.string().min(1, { message: 'Content is required.' }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Price must be a number.',
  }),
  status: z.string().optional(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
  file: z.instanceof(File).optional(),
});

export default function NewServiceForm() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { mutate: createService } = useCreateService();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      price: '0',
      status: 'draft',
      description: '',
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

  // Rich text editor functions
  const [editorContent, setEditorContent] = useState('');

  const formatText = (format: string) => {
    const textarea = document.getElementById(
      'description'
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let formattedText = '';
    let cursorPosition = 0;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        cursorPosition = 2;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        cursorPosition = 1;
        break;
      case 'underline':
        formattedText = `__${selectedText}__`;
        cursorPosition = 2;
        break;
      case 'list':
        formattedText = `\n- ${selectedText}`;
        cursorPosition = 3;
        break;
      case 'h1':
        formattedText = `\n# ${selectedText}`;
        cursorPosition = 3;
        break;
      case 'h2':
        formattedText = `\n## ${selectedText}`;
        cursorPosition = 4;
        break;
      default:
        return;
    }

    const newValue =
      textarea.value.substring(0, start) +
      formattedText +
      textarea.value.substring(end);

    form.setValue('description', newValue);
    setEditorContent(newValue);

    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + cursorPosition,
        start + cursorPosition + selectedText.length
      );
    }, 0);
  };

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
                        <FormLabel>Title</FormLabel>
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
                        <FormLabel>Content</FormLabel>
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (USD)</FormLabel>
                        <FormDescription>
                          Set the price for this service (0 for free)
                        </FormDescription>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0"
                            {...field}
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

                <div className="mt-4 p-4 border rounded-md">
                  <div className="prose prose-sm max-w-none">
                    {editorContent.split('\n').map((line, i) => {
                      // Basic markdown parsing for preview
                      if (line.startsWith('# ')) {
                        return (
                          <h1 key={i} className="text-xl font-bold">
                            {line.substring(2)}
                          </h1>
                        );
                      } else if (line.startsWith('## ')) {
                        return (
                          <h2 key={i} className="text-lg font-bold">
                            {line.substring(3)}
                          </h2>
                        );
                      } else if (line.startsWith('- ')) {
                        return <li key={i}>{line.substring(2)}</li>;
                      } else {
                        // Handle bold, italic, underline
                        let content = line;
                        content = content.replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong>$1</strong>'
                        );
                        content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
                        content = content.replace(/__(.*?)__/g, '<u>$1</u>');

                        return line ? (
                          <p
                            key={i}
                            dangerouslySetInnerHTML={{ __html: content }}
                          />
                        ) : (
                          <br key={i} />
                        );
                      }
                    })}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  📁 Upload Image
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
                        <img
                          src={imagePreview || '/placeholder.svg'}
                          alt="Preview"
                          className="max-h-[200px] mx-auto rounded-md object-contain"
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
