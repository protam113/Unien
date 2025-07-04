import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { useUpdateServiceStatus } from '@/hooks/service/useService';
import { toast } from 'sonner';
import { VisibilityOption } from '@/components/wrappers/VisibilitySelect';
import { VisibilityChange } from '@/components/wrappers/ChangeToShow';
import { useState } from 'react';
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

export function PopularServiceCard({ post }: PostCardProps) {
  const userInfo = useAuthStore((state) => state.userInfo);

  const [visibility, setVisibility] = useState<VisibilityOption>(
    post.status as VisibilityOption
  );

  const { mutate: updateServiceStatus } = useUpdateServiceStatus();

  const handleStatusChange = (postId: string, newStatus: string) => {
    if (!postId) {
      toast.error('Invalid contact ID!');
      return;
    }

    updateServiceStatus({ postId, updateStatus: { status: newStatus } });
  };

  const handleVisibilityChange = (newVisibility: VisibilityOption) => {
    // Khi visibility thay đổi, gọi hàm handleStatusChange để cập nhật trạng thái mới
    setVisibility(newVisibility);
    handleStatusChange(post._id, newVisibility); // Cập nhật trạng thái
  };

  return (
    <div className="border border-gray-200 overflow-hidden">
      <Link href={`/admin/service/${post.slug}`}>
        <div className="relative h-48">
          <Image
            src={post.file || '/placeholder.svg'}
            alt={post.title}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-main text-gray-800 text-md font-bold hover:bg-lime-600">
            {new Intl.NumberFormat('vi-VN').format(post.price)} đ
          </Badge>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/admin/service/${post.slug}`}>
          <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{post.content}</p>
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
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
        </Link>
        {userInfo?.role === 'admin' && (
          <div className="flex items-center gap-2 mt-4 self-end sm:self-auto">
            <VisibilityChange
              label={`Change to ${visibility === 'show' ? 'Hide' : 'Show'}`}
              value={visibility === 'show' ? 'hide' : 'show'}
              onChange={handleVisibilityChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
