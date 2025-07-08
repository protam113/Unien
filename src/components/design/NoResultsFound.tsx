'use client';

import { NoResultsFoundProps } from '@/types';
import { Frown } from 'lucide-react';

export function NoResultsFound({
  title = 'Whoops, không có kết quả',
  message = 'Chúng tôi không thể tìm thấy bất kỳ kết quả tìm kiếm nào. Hãy thử lại lần sau',
}: NoResultsFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-md mx-auto">
      <div className="relative w-32 h-32 mb-6">
        {/* Folder/document background */}
        <div className="absolute inset-0  rounded-lg"></div>

        {/* Folder tab */}
        <div className="absolute top-0 left-4 w-8 h-3  rounded-t-md"></div>

        {/* Magnifying glass with sad face */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <Frown className="w-8 h-8 text-gray-400" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-10 bg-gray-300 rounded-full transform rotate-45 translate-x-3 translate-y-2"></div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{message}</p>
    </div>
  );
}
