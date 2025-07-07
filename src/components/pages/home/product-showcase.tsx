'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CategoryCard,
  CustomImage,
  ErrorLoading,
  LoadingSpin,
  SectionHeader,
} from '@/components';
import ProductCategoryCard from './ProductCategory';
import { ProductList } from '@/lib/responses/productLib';
import { Icons } from '@/assetts/icons';
import ProductCard from '../product/product-card';

const EXCHANGE_RATE = 25500;

export default function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const params = {
    category: selectedCategory ?? undefined,
    limit: 8,
  };

  const { products, isLoading, isError } = ProductList(1, params, 0);

  // Convert USD to VND and format with commas
  const formatVND = (usd: number) => {
    const vnd = usd * EXCHANGE_RATE;
    return ` ${new Intl.NumberFormat('vi-VN').format(vnd)} VND`;
  };

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6">
        <SectionHeader title="Các Sản Phẩm Nổi Bật" />
        <Link
          href="/products"
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
        >
          Xem Thêm
          <Icons.ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <CategoryCard onCategorySelect={setSelectedCategory} type="products" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <LoadingSpin />
        ) : isError ? (
          <ErrorLoading />
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </section>
  );
}
