import Image from 'next/image';

// Product Card Component
function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] border border-gray-100 hover:border-gray-200 group relative">
      {/* Product Image */}
      <div className="relative">
        <Image
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
            ₫{product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
