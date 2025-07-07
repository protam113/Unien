import { CustomImage } from '@/components';
import Link from 'next/link';

// Product Card Component
function ProductCard({ product }: { product: any }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] border border-gray-100 hover:border-gray-200 group relative"
    >
      {/* Product Image */}
      <div className="relative">
        <CustomImage
          src={product.file?.[0] || '/placeholder.svg'}
          alt={product.title}
          className="w-full aspect-square object-cover"
          width={200}
          height={200}
        />
      </div>

      {/* Product Info */}
      <div className="p-2">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
          {product.title}
        </h3>

        <div className="mt-1 flex items-baseline">
          <span className="text-red-500 font-bold">
            {product?.price && product.price > 0
              ? `₫${product.price.toLocaleString()}`
              : 'Liên hệ'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
