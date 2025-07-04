'use client';

import { useProductDetail, useProductList } from '@/hooks/product/useProduct';
import { Filters } from '@/types/types';

export const ProductList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useProductList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? {
    current_page: 1,
    total_page: 1,
    total: 0,
    page_size: 20,
  };

  const products = data?.results ?? [];

  return {
    products,
    isLoading,
    isError,
    pagination,
  };
};

// ServiceDetailData.ts
export const ProductDetailData = (slug: string, refreshKey: number) => {
  const { data, isLoading, isError } = useProductDetail(slug, refreshKey);

  const product = data?.result;

  return {
    product,
    isLoading,
    isError,
  };
};
