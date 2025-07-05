'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryCard, CustomImage, SectionHeader } from '@/components';
import ProductCategoryCard from './ProductCategory';
import { ProductList } from '@/lib/responses/productLib';
import { Icons } from '@/assetts/icons';

const EXCHANGE_RATE = 25500;

export default function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const params = {
    category: selectedCategory ?? undefined,
    limit: 5,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <Icons.Loader2 className="animate-spin h-6 w-6 text-gray-500" />
            <span className="ml-2 text-sm text-gray-500">
              Đang tải sản phẩm...
            </span>
          </div>
        ) : isError ? (
          <div className="col-span-full flex justify-center items-center py-10 text-red-500">
            <Icons.AlertTriangle className="h-5 w-5 mr-2" />
            <span>Không thể tải sản phẩm. Vui lòng thử lại sau.</span>
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id} className="group shadow-xl">
              <div className="relative aspect-square overflow-hidden  mb-3 bg-gray-100">
                <CustomImage
                  src={product.file?.[0] || '/logo.svg'}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium text-sm mb-2">{product.title}</h3>
              <div className="flex items-start flex-col">
                <div className="flex flex-col">
                  <span className="font-bold text-red-600">
                    {formatVND(product.price)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
