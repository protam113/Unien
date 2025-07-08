'use client';

import type React from 'react';
import { useState } from 'react';
//UI components

//Components
import { RefreshButton } from '@/components/button/RefreshButton';
import { CustomPagination } from '@/components/design/pagination';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Container } from '@/components/wrappers/Container';
import { ContactList } from '@/lib/responses/contactLib';
import { useDeleteContact } from '@/hooks/contact/useContact';
import ConfirmDialog from '@/components/design/Dialog';
import { ContactTable } from '@/components/pages/admin/table/ContactTable';
import { Heading } from '@/components/design/Heading';
import SelectStatus from '@/components/pages/admin/contact/selectStatus';

export default function ProductManager() {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedContact, setSelectedContact] = useState<string>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { mutate: deleteContact } = useDeleteContact();

  const handleDeleteClick = (id: string) => {
    setSelectedContact(id); // Chọn contact cần xóa
    setDeleteDialogOpen(true); // Mở dialog xác nhận xóa
  };

  const handleDeleteConfirm = () => {
    if (selectedContact) {
      deleteContact(selectedContact);
      setSelectedContact(undefined);
      setDeleteDialogOpen(false);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const params = {
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    limit: pageSize,
  };

  const { contacts, isLoading, isError, pagination } = ContactList(
    currentPage,
    params,
    refreshKey
  );

  // const { mutate: createProduct } = useCreateProduct();

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
    <>
      <Container>
        <Heading
          name="Quản lý liên hệ"
          desc="Quản lý danh sách những người liên hệ của bạn ở đây"
        />

        <div className="md:flex col flex-col-2 md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <RefreshButton onClick={handleRefresh} />
            <div className="flex items-center gap-4">
              <span className="text-16 font-semibold">Show:</span>
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
            <div className="flex items-center gap-4">
              <span className="text-16 font-semibold">Status:</span>

              <SelectStatus
                selectedStatus={selectedStatus}
                onStatusChange={(value) => setSelectedStatus(value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          <ContactTable
            contacts={contacts}
            isLoading={isLoading}
            isError={isError}
            onDelete={handleDeleteClick}
          />
        </div>
        <CustomPagination
          currentPage={currentPage}
          totalPage={pagination.total_page}
          onPageChange={handlePageChange}
        />
      </Container>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Are you sure"
        description="This action cannot be undone. This will permanently delete the contact."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
