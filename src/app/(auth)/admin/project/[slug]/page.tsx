'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import BackButton from '@/components/button/BackButton';
import { ProjectDetailData } from '@/lib/responses/projectLib';
import { CardContent } from '@/components/ui/card';
import { Calendar, Clock, Edit, Eye, Trash, User } from 'lucide-react';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-separator';
import { useDeleteProject } from '@/hooks/project/useProject';
import { useState } from 'react';
import ConfirmDialog from '@/components/design/Dialog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlockComponent } from '@/components/richText/ContentSection';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-96">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Page() {
  const { slug } = useParams();
  const router = useRouter();
  const blogSlug = Array.isArray(slug) ? slug[0] : slug || '';
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const userInfo = useAuthStore((state) => state.userInfo);

  const { project, isLoading, isError } = ProjectDetailData(blogSlug, 0);
  const { mutate: deleteProject } = useDeleteProject();

  // Kiểm tra nếu blog là undefined
  if (isLoading) return <LoadingSpinner />;
  if (isError || !project)
    return <p className="text-red-500">Blog not found.</p>;

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteProject(project._id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        router.back(); // hoặc router.push('/admin/project')
      },
    });
  };

  return (
    <>
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <BackButton />
                <h1 className="text-2xl font-bold tracking-tight">
                  Project Details
                </h1>
                <Badge
                  variant={project.status === 'show' ? 'default' : 'secondary'}
                >
                  {project.status}
                </Badge>
              </div>
              {userInfo?.role === 'admin' && (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Project
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteClick}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Created: {formatSmartDate(project.createdAt)}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  Updated: {formatSmartDate(project.updatedAt)}
                </div>
                <div className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  {project.views} views
                </div>
                <div className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  Posted by: {project.user.username}
                </div>
              </div>
            </CardContent>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium">Title</h3>
              <p className="text-sm mt-1">{project.title}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Slug</h3>
              <p className="text-sm mt-1">{project.slug}</p>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium">Content</h3>
            <p className="text-sm mt-1">{project.content}</p>
          </div>
          <Separator />

          <div className="mb-2 sm:mb-0">
            <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
              SERVICE
            </span>
            <p className="font-bold text-lime-500 text-xl">
              {project?.service?.map((cat) => cat.title).join(', ')}
            </p>
          </div>
          <div className="mb-12 bg-gray-200 rounded-md overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src={project?.file || '/placeholder.svg?height=400&width=800'}
                alt="Project feature image"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium">Client</h3>
              <p className="text-sm mt-1">{project.client}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Brand Name</h3>
              <p className="text-sm mt-1">{project.brand_name}</p>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium">Testimonial</h3>
            <p className="text-sm mt-1 italic">{project.testimonial}</p>
          </div>
        </div>

        <h3 className="text-sm font-medium">Description</h3>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            blockquote: ({ children }) => (
              <blockquote className="custom-blockquote">{children}</blockquote>
            ),
            code: ({ inline, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || '');

              if (!inline) {
                return (
                  <CodeBlockComponent
                    value={String(children).replace(/\n$/, '')}
                    language={match ? match[1] : undefined}
                  />
                );
              }

              return (
                <code className="inline-code" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {project.description}
        </ReactMarkdown>
      </div>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Are you sure"
        description="This action cannot be undone. This will permanently delete the project."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
