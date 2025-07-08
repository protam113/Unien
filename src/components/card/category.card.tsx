'use client';

import { CategoryList } from '@/lib/responses/categoriesLib';
import { CategoryCardProps } from '@/types';
import type { Category } from '@/types';
import React, { useState } from 'react';

export const CategoryCard: React.FC<CategoryCardProps> = ({
  onCategorySelect,
  type,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { categories, isLoading, isError } = CategoryList(
    1,
    { limit: 20, type: type },
    0
  );

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <nav className="flex overflow-x-auto pb-4 space-x-8">
      {/* View all */}
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-6 w-24 bg-gray-300 animate-pulse rounded-md"
          />
        ))
      ) : isError ? (
        <p className="text-red-500">Failed to load categories.</p>
      ) : (
        <>
          {/* View all - Không truyền categoryId */}
          <button
            onClick={() => handleCategoryClick(null)}
            className={`pb-4 px-1 font-medium ${
              selectedCategory === null
                ? 'text-main border-b-2 border-primary'
                : 'text-gray-600 hover:text-main'
            }`}
          >
            Tất cả
          </button>

          {/* Danh sách categories */}
          {categories.map((category: Category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className={`pb-4 px-1 ${
                selectedCategory === category._id
                  ? 'text-main border-b-2 border-primary font-medium'
                  : 'text-gray-600 hover:text-main'
              }`}
            >
              {category.name}
            </button>
          ))}
        </>
      )}
    </nav>
  );
};
