'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/container/SectionHeader';

// Exchange rate: 1 USD ≈ 25,500 VND
const EXCHANGE_RATE = 25500;

interface Product {
  id: string;
  title: string;
  image: string;
  oldPrice?: number;
  newPrice: number;
}

export default function ProductShowcase() {
  const [products] = useState<Product[]>([
    {
      id: '1',
      title: 'A Young Woman in Colorful Jacket',
      image: '/images/colorful-jacket.jpg',
      newPrice: 108,
    },
    {
      id: '2',
      title: 'Young Man in Vibrant Jacket',
      image: '/images/vibrant-jacket.jpg',
      oldPrice: 147,
      newPrice: 108,
    },
    {
      id: '3',
      title: 'Fashionable Woman with Orange Sunglasses',
      image: '/images/orange-sunglasses.jpg',
      oldPrice: 147,
      newPrice: 108,
    },
    {
      id: '4',
      title: 'Stretch Tee in Milk',
      image: '/images/stretch-tee.jpg',
      oldPrice: 137,
      newPrice: 98,
    },
  ]);

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
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative aspect-square overflow-hidden rounded-md mb-3 bg-gray-100">
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="font-medium text-sm mb-2">{product.title}</h3>
            <div className="flex items-start flex-col">
              <div className="flex flex-col">
                <span className="font-bold text-red-600">
                  {formatVND(product.newPrice)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
