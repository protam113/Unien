'use client';
import { Icons } from '@/assetts/icons';
import { PostCard } from '@/components';

export function BlogListSection({
  blogs,
  pagination,
  loading,
  handleLoadMore,
  allLoaded,
}: {
  blogs: any[];
  pagination: any;
  loading: boolean;
  handleLoadMore: () => void;
  allLoaded: boolean;
}) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>

      {!allLoaded && pagination.total_page > 1 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-8 py-3 rounded-full bg-gray-900 text-white font-medium transition-all duration-300
              hover:bg-main hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50
              disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center">
                <Icons.Loader2 className="animate-spin mr-2 h-5 w-5" />
                Đang tải ...
              </span>
            ) : (
              'TẢI THÊM'
            )}
          </button>
        </div>
      )}
    </>
  );
}
