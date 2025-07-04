'use client';

import NoResultsFound from '@/components/design/NoResultsFound';
import { ServiceList } from '@/lib/responses/serviceLib';
import { ServiceCard } from './ServiceCard';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PopularServiceCard } from './PopularServiceCard';
import { CustomPagination } from '@/components/design/pagination';
import { RefreshButton } from '@/components/button/RefreshButton';
import { DraftServiceCard } from './DraftServiceCard';
import Heading from '@/components/design/Heading';
import Container from '@/components/wrappers/Container';
import AdminServiceCategoryCard from './ServiceCategory';

export enum ServiceStatus {
  Show = 'show',
  Hide = 'hide',
  Popular = 'popular',
  Draft = 'draft',
}

export default function ServiceListDataAdmin() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ✅ Nếu là "all", không truyền status
  const params = {
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    category: selectedCategory ?? undefined,
    page_size: pageSize,
  };
  const { services, isLoading, isError, pagination } = ServiceList(
    currentPage,
    params,
    refreshKey
  );
  const {
    services: popularService,
    isLoading: Loading,
    isError: Error,
  } = ServiceList(
    1,
    {
      status: 'popular',
    },
    0
  );

  const {
    services: draftService,
    isLoading: draftLoading,
    isError: draftError,
  } = ServiceList(
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
    <Container>
      <section className="mb-12">
        <Heading name="Dịch vụ nhap " />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {draftService && draftService.length > 0 ? (
            draftService.map((post) => (
              <DraftServiceCard key={post._id} post={post} />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-24">
              <NoResultsFound />
            </div>
          )}
        </div>
        <Heading name="Dịch vụ phổ biến " />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularService && popularService.length > 0 ? (
            popularService.map((post) => (
              <PopularServiceCard key={post._id} post={post} />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-24">
              <NoResultsFound />
            </div>
          )}
        </div>
      </section>
      <Heading name="Tất cả dịch vụ" />

      <div className="border-b border-gray-200 mb-8">
        <AdminServiceCategoryCard onCategorySelect={setSelectedCategory} />
      </div>
      {/* Heading */}
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
          {services && services.length > 0 ? (
            services.map((post) => <ServiceCard key={post._id} post={post} />)
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
    </Container>
  );
}
