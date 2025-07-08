'use client';

import React, { useState } from 'react';
import { Trash2, Filter, Plus, AlertCircle } from 'lucide-react';
import { RefreshButton } from '@/components/button/RefreshButton';
import {
  Container,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  LoadingSpin,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components';
import { CustomPagination } from '@/components/design/pagination';
import { UserList } from '@/lib/';
import { useDeleteManager } from '@/hooks/auth/useManager';
import ConfirmDialog from '@/components/design/Dialog';
import UserRolesChart from '@/components/pages/admin/chart/user-roles-chart';
import { Badge } from '@/components/ui/badge';
import { Heading } from '@/components/design/Heading';

const Page = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);

  const { users, isLoading, isError, pagination } = UserList(
    currentPage,
    {
      page_size: 10,
      role: selectedRole,
    },
    refreshKey
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectManager, setSelectManager] = useState<string>();

  const { mutate: deleteManager } = useDeleteManager();

  const handleDeleteClick = (id: string) => {
    setSelectManager(id);
    setDeleteDialogOpen(true);
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

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Container>
        {/* Stats Overview */}
        <Heading name="Quản lý người dùng" desc="Trang Quản Lý Quản Trị Viên" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Clients */}
          <Card>
            <CardContent className="p-4">
              <div className="justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Tổng số người dùng
                  </p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">
                      {pagination?.total || 0}
                    </h3>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members */}
          <Card>
            <CardContent className="p-4">
              <div className="justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Trang</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">
                      {pagination?.total_page || 0}
                    </h3>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <UserRolesChart />
        </div>

        {/* User Management Section */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">Người dùng</CardTitle>
              <RefreshButton onClick={handleRefresh} />
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full md:w-64">
                {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Quick Search"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                /> */}
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <Select
                  onValueChange={(value) =>
                    setSelectedRole(value === 'all' ? undefined : value)
                  }
                  value={selectedRole || 'all'}
                >
                  <SelectTrigger className="w-40">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="All members" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() =>
                    (window.location.href = '/admin/user/create_manager')
                  }
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Thêm quản trị viên
                </Button>
              </div>
            </div>

            {/* Table Section */}
            <div className="border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Quyền</TableHead>
                    <TableHead>Tel</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64">
                        <LoadingSpin />
                      </TableCell>
                    </TableRow>
                  ) : isError ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-gray-500"
                      >
                        <AlertCircle className="h-5 w-5 inline-block text-red-500" />{' '}
                        Error loading employee data.
                      </TableCell>
                    </TableRow>
                  ) : users && users.length > 0 ? (
                    users.map((employee) => {
                      const isProtectedRole = ['admin'].includes(
                        employee.role?.toLowerCase()
                      );

                      return (
                        <TableRow
                          key={employee._id}
                          className="hover:bg-gray-50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9  bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                                {employee.name?.substring(0, 2) ||
                                  employee.username?.substring(0, 2) ||
                                  'U'}
                              </div>
                              <div>
                                <p className="font-medium">{employee.name}</p>
                                <p className="text-sm text-gray-500">
                                  {employee.username}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>
                            <Badge
                              className={`font-normal ${getRoleColor(employee.role)}`}
                            >
                              {employee.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{employee.phone_number}</TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-500 font-mono">
                              {employee._id?.substring(0, 8)}...
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {/* <Button variant="ghost" size="sm">
                                Xem
                              </Button> */}
                              {!isProtectedRole && (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-destructive h-8 w-8"
                                  onClick={() =>
                                    handleDeleteClick(employee._id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-gray-500 py-8"
                      >
                        Không tìm thấy nhân viên nào.{' '}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {users?.length || 0} of {pagination?.current_page || 0}{' '}
                pages
              </p>
              <CustomPagination
                currentPage={currentPage}
                totalPage={pagination?.total_page || 1}
                onPageChange={handlePageChange}
              />
            </div>
          </CardContent>
        </Card>
      </Container>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Bạn có chắc không?"
        description="Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn người quản lý."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default Page;
