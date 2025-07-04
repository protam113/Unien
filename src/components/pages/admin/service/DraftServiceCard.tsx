import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { Trash } from 'lucide-react';
import {
  useDeleteService,
  useUpdateServiceStatus,
} from '@/hooks/service/useService';
import { useState } from 'react';
import ConfirmDialog from '@/components/design/Dialog';
import {
  VisibilityOption,
  VisibilitySelect,
} from '@/components/wrappers/VisibilitySelect';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

interface Post {
  _id: string;
  title: string;
  slug: string;
  price: number;
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

export function DraftServiceCard({ post }: PostCardProps) {
  const userInfo = useAuthStore((state) => state.userInfo);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>();
  const [visibility, setVisibility] = useState<VisibilityOption>(
    post.status as VisibilityOption
  );

  const { mutate: deleteService } = useDeleteService();
  const { mutate: updateServiceStatus } = useUpdateServiceStatus();

  const handleStatusChange = (postId: string, newStatus: string) => {
    if (!postId) {
      toast.error('Invalid contact ID!');
      return;
    }

    updateServiceStatus({ postId, updateStatus: { status: newStatus } });
  };

  const handleDeleteClick = (id: string) => {
    setSelectedService(id); // Chọn contact cần xóa
    setDeleteDialogOpen(true); // Mở dialog xác nhận xóa
  };

  const handleDeleteConfirm = () => {
    if (selectedService) {
      deleteService(selectedService);
      setSelectedService(undefined);
      setDeleteDialogOpen(false);
    }
  };

  const handleVisibilityChange = (newVisibility: VisibilityOption) => {
    // Khi visibility thay đổi, gọi hàm handleStatusChange để cập nhật trạng thái mới
    setVisibility(newVisibility);
    handleStatusChange(post._id, newVisibility); // Cập nhật trạng thái
  };

  return (
    <>
      <div className="border border-gray-200 overflow-hidden">
        <Link href={`/admin/service/${post.slug}`}>
          <div className="relative h-48">
            <Image
              src={post.file || '/placeholder.svg'}
              alt={post.title}
              fill
              className="object-cover"
            />

            {/* Price badge - left top */}
            <Badge className="absolute top-3 left-3 bg-main text-gray-800 text-md font-bold hover:bg-lime-600">
              {new Intl.NumberFormat('vi-VN').format(post.price)} đ
            </Badge>
            {/* Status badge - right top */}
            <Badge className="absolute top-3 right-3 bg-gray-600 text-white text-md font-bold">
              {post.status}
            </Badge>
          </div>
        </Link>
        <div className="p-4">
          <Link href={`/admin/service/${post.slug}`}>
            <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{post.content}</p>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full gap-2">
            {/* === User Info === */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt={post?.user?.username || 'User'}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">
                  {post?.user?.username}
                </span>
                <span className="text-xs text-gray-500">
                  {formatSmartDate(post.createdAt)}
                </span>
              </div>
            </div>
            {userInfo?.role === 'admin' && (
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <VisibilitySelect
                  value={visibility}
                  onChange={handleVisibilityChange}
                />
                <button
                  onClick={() => handleDeleteClick(post._id)}
                  className="p-1 rounded-md border border-red-500 text-red-600 bg-red-50 hover:bg-red-500 hover:text-white transition-all"
                  title="Delete Post"
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
        description="This action cannot be undone. This will permanently delete the service."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
