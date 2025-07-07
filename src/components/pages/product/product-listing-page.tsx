'use client';

import type React from 'react';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/helpers/utils';
import SidebarFilters from './product-side-filters';
import ProductCard from './product-card';
import { ProductList } from '@/lib/responses/productLib';
import NoResultsFound from '@/components/design/NoResultsFound';
import { LoadingSpin } from '@/components/loading/loading';

export function ProductListingPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeSortOption, setActiveSortOption] = useState('newest');
  const [expandedSections, setExpandedSections] = useState({
    brands: false,
    locations: false,
  });

  const params = {
    category: selectedCategory ?? undefined,
    limit: 20,
    type: 'show,popular', // Fixed typo in 'status'
  };

  const { products, isLoading, isError, pagination } = ProductList(
    currentPage,
    params,
    refreshKey
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-red-500">Error loading products</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen ">
      {/* Sidebar Filters */}
      <SidebarFilters
        activeCategory={selectedCategory || ''}
        setActiveCategory={setSelectedCategory}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Top Filter/Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 p-3  shadow-sm">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <span className="text-sm text-gray-500">Sắp xếp theo</span>
            <button
              className={cn(
                'px-3 py-1 text-sm rounded-md',
                activeSortOption === 'newest'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              )}
              onClick={() => setActiveSortOption('newest')}
            >
              Mới Nhất
            </button>
            <button
              className={cn(
                'px-3 py-1 text-sm rounded-md',
                activeSortOption === 'price'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              )}
              onClick={() => setActiveSortOption('price')}
            >
              Giá
            </button>
          </div>

          {/* Pagination */}
          <div className="flex items-center space-x-2">
            <button
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-600">
              {currentPage} / {pagination.total_page}
            </span>
            <button
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.total_page}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-24">
              <NoResultsFound />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
