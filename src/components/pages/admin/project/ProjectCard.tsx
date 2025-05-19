import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { Pen, Trash } from 'lucide-react';
import { useState } from 'react';
import ConfirmDialog from '@/components/design/Dialog';
import { useDeleteProject } from '@/hooks/project/useProject';
import { useAuthStore } from '@/store/authStore';

interface Post {
  _id: string;
  title: string;
  slug: string;
  brand_name: string;
  status: string;
  file: string;
  createdAt: string | Date;
  content: string;
  user?: {
    username: string;
    role: string;
  };
}

interface PostCardProps {
  post: Post;
}

export function ProjectCard({ post }: PostCardProps) {
  const userInfo = useAuthStore((state) => state.userInfo);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>();

  const { mutate: deleteProject } = useDeleteProject();

  const handleDeleteClick = (id: string) => {
    setSelectedProject(id); // Chọn contact cần xóa
    setDeleteDialogOpen(true); // Mở dialog xác nhận xóa
  };

  const handleDeleteConfirm = () => {
    if (selectedProject) {
      deleteProject(selectedProject);
      setSelectedProject(undefined);
      setDeleteDialogOpen(false);
    }
  };
  return (
    <>
      <div className="border border-gray-200 overflow-hidden">
        <Link href={`/admin/project/${post.slug}`}>
          <div className="relative h-48">
            <Image
              src={post.file || '/placeholder.svg'}
              alt={post.title}
              fill
              className="object-cover"
            />

            {/* Price badge - left top */}
            <Badge className="absolute top-3 left-3 bg-main text-gray-800 text-sm font-bold hover:bg-lime-600">
              {post.brand_name}
            </Badge>

            {/* Status badge - right top */}
            <Badge className="absolute top-3 right-3 bg-gray-600 text-white text-md font-bold">
              {post.status}
            </Badge>
          </div>
        </Link>
        <div className="p-4">
          <Link href={`/admin/project/${post.slug}`}>
            <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{post.content}</p>
          </Link>
          <div className="flex items-start justify-between w-full">
            {/* Avatar + Info */}
            <div className="flex items-center gap-2">
              <Image
                src={'/logo.svg'}
                alt={post?.user?.username || 'User'}
                width={30}
                height={30}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {post?.user?.username}
                </p>
                <p className="text-xs text-gray-500">
                  {formatSmartDate(post.createdAt)}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            {userInfo?.role === 'admin' && (
              <div className="flex items-center gap-2">
                <button
                  // onClick={() => handleEdit(post._id)}
                  className="bg-blue-100 border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white rounded-md p-1"
                >
                  <Pen className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(post._id)}
                  className="bg-red-100 border border-red-500 text-red-600 hover:bg-red-500 hover:text-white rounded-md p-1"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
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
