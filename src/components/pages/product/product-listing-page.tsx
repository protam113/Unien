'use client';

import type React from 'react';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarFilters from './product-side-filters';
import ProductCard from './product-card';

export default function ProductListingPage() {
  const [activeCategory, setActiveCategory] = useState('Điện Thoại & Phụ Kiện');
  const [activeSortOption, setActiveSortOption] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    categories: false,
    brands: false,
    locations: false,
    shipping: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const products = [
    {
      id: 1,
      title: 'Sạc nhanh 20w cáp Type-C cho iPhone',
      image: '/img/prod1.jpg',
      price: 14500,
      oldPrice: 24000,
      discount: 52,
      sold: '67.3k',
      isHot: true,
      isTopRated: false,
    },
    {
      id: 2,
      title: 'Cáp Sạc Siêu Nhanh 120W Cáp Cực Dài',
      image: '/img/prod1.jpg',
      price: 27500,
      oldPrice: 50000,
      discount: 46,
      sold: '75.7k',
      isHot: true,
      isTopRated: false,
    },
    {
      id: 3,
      title: 'Sạc Nhanh Đa Năng 4IN1 68W / 120W',
      image: '/img/prod1.jpg',
      price: 22899,
      oldPrice: 30000,
      discount: 24,
      sold: '47.1k',
      isHot: false,
      isTopRated: true,
    },
    {
      id: 4,
      title: 'Bộ sạc 49k - sạc nhanh 120W PD USB TypeC Sạc',
      image: '/img/prod1.jpg',
      price: 9900,
      oldPrice: 34000,
      discount: 71,
      sold: '8.1k',
      isHot: false,
      isTopRated: true,
    },
    {
      id: 5,
      title: 'Dây Cáp Sạc Nhanh USB Loại C 66w 6a',
      image: '/img/prod1.jpg',
      price: 17600,
      oldPrice: 23000,
      discount: 24,
      sold: '82.4k',
      isHot: true,
      isTopRated: false,
    },
    {
      id: 6,
      title: '20w 30W Sạc Nhanh Thông Minh USB',
      image: '/img/prod1.jpg',
      price: 20680,
      oldPrice: 33000,
      discount: 39,
      sold: '93.1k',
      isHot: false,
      isTopRated: true,
    },
    {
      id: 7,
      title: 'Củ sạc nhanh IP Cực Mạnh',
      image: '/img/prod1.jpg',
      price: 29000,
      oldPrice: 52000,
      discount: 44,
      sold: '18.6k',
      isHot: true,
      isTopRated: false,
    },
    {
      id: 8,
      title: 'Fly Fly Dragon Gaming Ngón Tay Tay Cầm',
      image: '/img/prod1.jpg',
      price: 6600,
      oldPrice: 22000,
      discount: 70,
      sold: '6.6k',
      isHot: false,
      isTopRated: true,
    },
    {
      id: 9,
      title: 'Dây cáp sạc điện thoại đăng đủ 3 trong 1',
      image: '/img/prod1.jpg',
      price: 11000,
      oldPrice: 46000,
      discount: 76,
      sold: '13.2k',
      isHot: false,
      isTopRated: true,
    },
    {
      id: 10,
      title: 'Ốp lưng iphone 15 Baby three Thỏ',
      image: '/img/prod1.jpg',
      price: 12000,
      oldPrice: 14000,
      discount: 14,
      sold: '4.7k',
      isHot: true,
      isTopRated: false,
    },
    {
      id: 11,
      title: 'Bộ sạc nhanh ( Củ PD 20.W + Dây sạc nhanh )',
      image: '/img/prod1.jpg',
      price: 29000,
      oldPrice: 35000,
      discount: 17,
      sold: '25.4k',
      isHot: true,
      isTopRated: false,
    },
    {
      id: 12,
      title: 'Ốp Lưng iPhone TPU Silicon Mềm 4 Góc',
      image: '/img/prod1.jpg',
      price: 1000,
      oldPrice: 2000,
      discount: 50,
      sold: '1081.6k',
      isHot: false,
      isTopRated: true,
    },
  ];

  const totalPages = Math.ceil(products.length / 12);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Filters */}
      <SidebarFilters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Top Filter/Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 bg-white p-3 rounded-md shadow-sm">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <span className="text-sm text-gray-500">Sắp xếp theo</span>

            <SortButton
              active={activeSortOption === 'newest'}
              onClick={() => setActiveSortOption('newest')}
            >
              Mới Nhất
            </SortButton>

            <SortButton
              active={activeSortOption === 'price'}
              onClick={() => setActiveSortOption('price')}
            >
              Giá
            </SortButton>
          </div>

          {/* Pagination (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {currentPage}/{totalPages}
            </span>
            <PaginationButton
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationButton>
            <PaginationButton
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationButton>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination (Mobile) */}
        <div className="flex md:hidden items-center justify-center space-x-2 mt-6">
          <PaginationButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationButton>

          {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            const pageNumber =
              currentPage <= 3
                ? index + 1
                : currentPage >= totalPages - 2
                  ? totalPages - 4 + index
                  : currentPage - 2 + index;

            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <PaginationButton
                  key={pageNumber}
                  active={currentPage === pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </PaginationButton>
              );
            }
            return null;
          })}

          <PaginationButton
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}

// Sort Button Component
function SortButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        'px-3 py-1.5 text-sm font-medium rounded transition-colors border',
        active
          ? 'bg-red-500 text-white border-red-500'
          : 'bg-white text-gray-700 border-gray-200 hover:border-red-500 hover:text-red-500'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Pagination Button Component
function PaginationButton({
  children,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        'w-8 h-8 flex items-center justify-center rounded text-sm transition-colors',
        active
          ? 'bg-red-500 text-white'
          : 'bg-white text-gray-700 border border-gray-200 hover:border-red-500 hover:text-red-500',
        disabled &&
          'opacity-50 cursor-not-allowed hover:border-gray-200 hover:text-gray-700'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
