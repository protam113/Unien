import { ArrowUpDown, Info, Trash } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductList } from '@/lib/responses/productLib';
import { useState } from 'react';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { RefreshButton } from '@/components/button/RefreshButton';
import Container from '@/components/wrappers/Container';
import { CustomPagination } from '@/components/design/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BlogStatus } from '../blog/BlogList';
import AdminProductCategoryCard from './product-cateogry.admin';
import { useDeleteProduct } from '@/hooks/product/useProduct';
import ConfirmDialog from '@/components/design/Dialog';
export default function ProductListPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>();
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined
  );
  const [pageSize, setPageSize] = useState(10);
  const { mutate: deleteProduct } = useDeleteProduct();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const params = {
    ...(selectedStatus !== 'all' &&
      selectedStatus !== null && { status: selectedStatus }),
    category: selectedCategory ?? undefined,
    limit: pageSize,
    sortByPrice: selectedSort ?? undefined,
  };

  const { products, isLoading, isError, pagination } = ProductList(
    currentPage,
    params,
    refreshKey
  );

  if (isLoading || isError) return <p>Loading...</p>;

  const handleDeleteClick = (id: string) => {
    setSelectedProduct(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      // Check if selectedProduct exists
      deleteProduct(selectedProduct);
      setSelectedProduct(undefined);
      setDeleteDialogOpen(false);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleSortPrice = () => {
    // Cycle through: null -> asc -> desc -> null
    if (selectedSort === null) {
      setSelectedSort('desc');
    } else if (selectedSort === 'desc') {
      setSelectedSort('asc');
    } else {
      setSelectedSort(null);
    }
  };

  // Helper function to display current sort state
  const getSortIcon = () => {
    if (selectedSort === 'asc') {
      return <span className="ml-1 text-blue-600">↑</span>;
    } else if (selectedSort === 'desc') {
      return <span className="ml-1 text-blue-600">↓</span>;
    }
    return null;
  };

  return (
    <>
      <Container className=" mx-auto py-6">
        <AdminProductCategoryCard onCategorySelect={setSelectedCategory} />

        {/* Filter status */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Filter status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Select
              onValueChange={(value) => setSelectedStatus(value)}
              value={selectedStatus ?? undefined}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value={BlogStatus.Show}>Hiện</SelectItem>
                <SelectItem value={BlogStatus.Hide}>Ẩn</SelectItem>
                <SelectItem value={BlogStatus.Popular}>Phổ Biến</SelectItem>
                <SelectItem value={BlogStatus.Draft}>Nháp</SelectItem>
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
        <div className="bg-white  shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Image
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Tên
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Thể loại
                </th>

                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Info
                </th>

                <th
                  className="py-3 px-4 text-left text-sm font-medium text-gray-500 cursor-pointer select-none flex items-center"
                  onClick={handleSortPrice}
                >
                  <span>Giá</span>
                  <div className="ml-1">
                    <ArrowUpDown
                      className={`h-4 w-4 ${selectedSort ? 'text-blue-600' : 'text-gray-400'}`}
                    />
                  </div>
                  {getSortIcon()}
                </th>

                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Trạng Thái
                </th>

                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Ngày Tạo
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="w-12 h-8 relative">
                      <Image
                        src={product.file?.[0] || '/placeholder.svg'}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{product.title}</td>
                  <td className="py-3 px-4 text-sm">{product.category.name}</td>

                  <td className="py-3 px-4">
                    <Info className="h-4 w-4 text-blue-600" />
                  </td>

                  <td className="py-3 px-4 text-sm">
                    {new Intl.NumberFormat('vi-VN').format(product.price)} đ
                  </td>

                  <td className="py-3 px-4">
                    <StatusBadge status={product.status} />
                  </td>

                  <td className="py-3 px-4 text-sm">
                    {' '}
                    {formatSmartDate(product.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {/* <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-blue-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button> */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-red-600"
                        onClick={() => handleDeleteClick(product._id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {pagination.current_page} of {pagination.total_page}
            </div>
            <div className="flex space-x-2">
              <CustomPagination
                currentPage={currentPage}
                totalPage={pagination.total_page}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </Container>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Bạn có chắc chắn không?"
        description="Không thể hoàn tác hành động này. Thao tác này sẽ xóa sản phẩm vĩnh viễn."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'show':
        return 'bg-blue-100 text-blue-800';
      case 'popular':
        return 'bg-yellow-100 text-yellow-800';
      case 'hide':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Badge variant="outline" className={`${getStatusStyles()} font-normal`}>
      {status}
    </Badge>
  );
}
