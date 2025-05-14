'use client';

import React, { useState } from 'react';
import { EmployeeColumns } from '@/types/columns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader, Trash2 } from 'lucide-react';
import { RefreshButton } from '@/components/button/RefreshButton';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CustomPagination } from '@/components/design/pagination';
import Container from '@/components/container/Container';
import Heading from '@/components/pages/heading/Heading';
import { UserList } from '@/lib/responses/userLib';
import { useDeleteManager } from '@/hooks/auth/useManager';
import ConfirmDialog from '@/components/design/Dialog';
import PushButton from '@/components/button/PushButton';
import UserRolesChart from '@/components/pages/admin/chart/user-roles-chart';

const Page = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);

  const { users, isLoading, isError, pagination } = UserList(
    currentPage,
    {
      page_size: 20,
      role: selectedRole,
    },
    refreshKey
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectManager, setSelectManager] = useState<string>();

  const { mutate: deleteManager } = useDeleteManager();

  const handleDeleteClick = (id: string) => {
    setSelectManager(id); // Chọn contact cần xóa
    setDeleteDialogOpen(true); // Mở dialog xác nhận xóa
  };

  const handleDeleteConfirm = () => {
    if (selectManager) {
      deleteManager(selectManager);
      setSelectManager(undefined);
      setDeleteDialogOpen(false);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <Container>
        <div className="flex justify-between items-center w-full">
          <div className="flex-1">
            <Heading name="User Page" />
          </div>
          <div className="flex-1 flex justify-end">
            {/* For future implementation */}
            <PushButton
              href="/admin/user/create_manager"
              label="Create Manager"
            />
          </div>
        </div>
        <UserRolesChart />

        <div className="md:flex col flex-col-2 md:flex-row justify-between items-center mb-6">
          <RefreshButton onClick={handleRefresh} />
          <div className="flex items-center gap-2">
            <div className="w-1/3">
              <Select
                onValueChange={(value) =>
                  setSelectedRole(value === 'all' ? undefined : value)
                }
                value={selectedRole || 'all'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {EmployeeColumns.map((col) => (
                  <TableHead key={col.key} className={col.className}>
                    {col.label}
                  </TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={EmployeeColumns.length + 1}
                    className="h-64"
                  >
                    <div className="flex justify-center items-center h-full">
                      <Loader className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={EmployeeColumns.length + 1}
                    className="text-center text-gray-500"
                  >
                    <AlertCircle className="h-5 w-5 inline-block text-red-500" />{' '}
                    Error loading employee data.
                  </TableCell>
                </TableRow>
              ) : users && users.length > 0 ? (
                users.map((employee) => {
                  const isProtectedRole = ['admin'].includes(
                    employee.role.toLowerCase()
                  );

                  return (
                    <TableRow key={employee._id}>
                      {EmployeeColumns.map((col) => (
                        <TableCell key={col.key} className={col.className}>
                          {col.key === '_id' &&
                            employee._id.substring(0, 8) + '...'}
                          {col.key === 'username' && employee.username}
                          {col.key === 'name' && employee.name}
                          {col.key === 'email' && employee.email}
                          {col.key === 'role' && employee.role}
                        </TableCell>
                      ))}

                      <TableCell className="text-right">
                        {!isProtectedRole && (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-destructive"
                              onClick={() => handleDeleteClick(employee._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={EmployeeColumns.length + 1}
                    className="text-center text-gray-500"
                  >
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
        description="This action cannot be undone. This will permanently delete the manager."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default Page;
