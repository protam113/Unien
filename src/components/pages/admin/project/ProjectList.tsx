'use client';

import NoResultsFound from '@/components/design/NoResultsFound';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CustomPagination } from '@/components/design/pagination';
import { RefreshButton } from '@/components/button/RefreshButton';
import { ProjectList } from '@/lib/responses/projectLib';
import { PopularProjectCard } from './PopularProjectCard';
import { ProjectCard } from './ProjectCard';
import { DraftProjectCard } from './DraftProjectCard';
import ServiceCateCard from './ServiceCate';
import Heading from '@/components/design/Heading';

export enum ServiceStatus {
  Show = 'show',
  Hide = 'hide',
  Popular = 'popular',
  Draft = 'draft',
}

export default function ProjectListDataAdmin() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const params = {
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    service: selectedCategory ?? undefined,
    page_size: pageSize,
  };

  const { projects, isLoading, isError, pagination } = ProjectList(
    currentPage,
    params,
    refreshKey
  );

  const {
    projects: popularProjects,
    isLoading: Loading,
    isError: Error,
  } = ProjectList(
    1,
    {
      status: 'popular',
    },
    0
  );

  const {
    projects: draftProjects,
    isLoading: draftLoading,
    isError: draftError,
  } = ProjectList(
    1,
    {
      status: 'draft',
    },
    0
  );

  if (isLoading || isError || Loading || Error || draftLoading || draftError)
    return <p>Loading...</p>;

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setRefreshKey((prev) => prev + 1); // Refresh data manually
  };

  return (
    <main>
      <section className="mb-12">
        <Heading name="Dự án nháp " />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {draftProjects && draftProjects.length > 0 ? (
            draftProjects.map((post) => (
              <DraftProjectCard key={post._id} post={post} />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-24">
              <NoResultsFound />
            </div>
          )}
        </div>

        <Heading name="Dự án tiêu biểu " />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularProjects && popularProjects.length > 0 ? (
            popularProjects.map((post) => (
              <PopularProjectCard key={post._id} post={post} />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-24">
              <NoResultsFound />
            </div>
          )}
        </div>
      </section>
      <Heading name="Toàn bộ dự án " />
      <div className="border-b border-gray-200 mb-8">
        <ServiceCateCard onCategorySelect={setSelectedCategory} />
      </div>
      {/* Filter status */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Filter status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <Select
            onValueChange={(value) => setSelectedStatus(value)}
            value={selectedStatus}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value={ServiceStatus.Show}>Hiện</SelectItem>
              <SelectItem value={ServiceStatus.Hide}>Ẩn</SelectItem>
              <SelectItem value={ServiceStatus.Popular}>Phổ Biến</SelectItem>
              <SelectItem value={ServiceStatus.Draft}>Nháp</SelectItem>
            </SelectContent>
          </Select>

          <RefreshButton onClick={handleRefresh} />
        </div>

        {/* Page size */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap">Show:</span>
          <Select
            onValueChange={handlePageSizeChange}
            defaultValue={String(pageSize)}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Services list */}
      <section className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((post) => <ProjectCard key={post._id} post={post} />)
          ) : (
            <div className="col-span-full flex items-center justify-center py-24">
              <NoResultsFound />
            </div>
          )}
        </div>
        <CustomPagination
          currentPage={currentPage}
          totalPage={pagination.total_page}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
