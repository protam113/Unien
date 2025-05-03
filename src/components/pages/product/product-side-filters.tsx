import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

function SidebarFilters({
  activeCategory,
  setActiveCategory,
  expandedSections,
  toggleSection,
}: {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}) {
  const categories = [
    'Điện Thoại & Phụ Kiện',
    'Điện thoại',
    'Máy tính bảng',
    'Pin Dự Phòng',
    'Pin Gắn Trong, Cáp và Bộ Sạc',
    'Ốp lưng, bao da, Miếng dán điện thoại',
  ];

  const brands = [
    'Apple',
    'Samsung',
    'Xiaomi',
    'Baseus',
    'Anker',
    'GOOJOODOQ',
    'Basefast',
    'Hoco',
  ];

  return (
    <div className="w-full md:w-1/4 lg:w-1/5 bg-white p-4 border-r border-gray-200 md:min-h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-800">Tất Cả Danh Mục</h2>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <button
                className={cn(
                  'w-full text-left py-1.5 px-2 rounded text-sm hover:bg-gray-100 transition-colors flex items-center',
                  activeCategory === category
                    ? 'text-red-500 font-medium'
                    : 'text-gray-700'
                )}
                onClick={() => setActiveCategory(category)}
              >
                {index === 0 && <span className="mr-2 text-red-500">•</span>}
                {category}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="text-sm text-gray-500 mt-2 flex items-center"
          onClick={() => toggleSection('categories')}
        >
          Thêm{' '}
          {expandedSections.categories ? (
            <ChevronUp className="h-3 w-3 ml-1" />
          ) : (
            <ChevronDown className="h-3 w-3 ml-1" />
          )}
        </button>
      </div>

      {/* Filter Section */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">BỘ LỌC TÌM KIẾM</span>
        </h3>
        {/* Brands */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Thương Hiệu</h4>
          <ul className="space-y-2">
            {brands
              .slice(0, expandedSections.brands ? brands.length : 4)
              .map((brand, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${index}`}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`brand-${index}`}
                    className="text-sm text-gray-600"
                  >
                    {brand}
                  </label>
                </li>
              ))}
          </ul>
          {brands.length > 4 && (
            <button
              className="text-sm text-gray-500 mt-2 flex items-center"
              onClick={() => toggleSection('brands')}
            >
              Thêm{' '}
              {expandedSections.brands ? (
                <ChevronUp className="h-3 w-3 ml-1" />
              ) : (
                <ChevronDown className="h-3 w-3 ml-1" />
              )}
            </button>
          )}
        </div>
        {/* Locations
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Nơi Bán</h4>
          <ul className="space-y-2">
            {locations
              .slice(0, expandedSections.locations ? locations.length : 4)
              .map((location, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`location-${index}`}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`location-${index}`}
                    className="text-sm text-gray-600"
                  >
                    {location}
                  </label>
                </li>
              ))}
          </ul>
          {locations.length > 4 && (
            <button
              className="text-sm text-gray-500 mt-2 flex items-center"
              onClick={() => toggleSection('locations')}
            >
              Thêm{' '}
              {expandedSections.locations ? (
                <ChevronUp className="h-3 w-3 ml-1" />
              ) : (
                <ChevronDown className="h-3 w-3 ml-1" />
              )}
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default SidebarFilters;
