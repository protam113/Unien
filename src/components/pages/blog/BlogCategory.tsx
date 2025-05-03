'use client';

import React, { useState } from 'react';

// Định nghĩa type cho category
interface Category {
  _id: string;
  name: string;
}

// Props nếu muốn nhận callback khi chọn category
interface CategoryCardProps {
  onCategorySelect?: (categoryId: string | null) => void;
}

const mockCategories: Category[] = [
  { _id: '1', name: 'Technology' },
  { _id: '2', name: 'Design' },
  { _id: '3', name: 'Business' },
  { _id: '4', name: 'Startup' },
];

const CategoryCard: React.FC<CategoryCardProps> = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = mockCategories;

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <nav className="flex overflow-x-auto pb-4 space-x-8">
      {/* View all */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={`pb-4 px-1 font-medium ${
          selectedCategory === null
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        View all
      </button>

      {/* Danh sách categories */}
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => handleCategoryClick(category._id)}
          className={`pb-4 px-1 ${
            selectedCategory === category._id
              ? 'text-primary border-b-2 border-primary font-medium'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {category.name}
        </button>
      ))}
    </nav>
  );
};

export default CategoryCard;
