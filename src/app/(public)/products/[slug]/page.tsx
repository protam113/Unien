'use client';

import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductGallery } from '@/components/pages/product/product-gallery';
import { ProductDetailData } from '@/lib/responses/productLib';
import NoResultsFound from '@/components/design/NoResultsFound';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { Container } from '@/components/wrappers/Container';
import Link from 'next/link';

export default function Page() {
  const { slug } = useParams();
  const router = useRouter();
  const productSlug = Array.isArray(slug) ? slug[0] : slug || '';

  const onClick = () => {
    router.push('/contact');
  };

  const { product, isLoading, isError } = ProductDetailData(productSlug, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <NoResultsFound />
      </div>
    );
  }

  return (
    <Container className="mx-auto px-4 py-8 mt-18">
      <Link
        href="/products"
        className="inline-block mb-8 text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Quay lại
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Gallery - Left Side */}
        <div>
          <ProductGallery images={product?.file || []} />
        </div>

        {/* Product Details - Right Side */}
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product?.title}</h1>
            <div className="flex items-center mt-2">
              <span className="text-sm text-muted-foreground">
                Added on{' '}
                {product?.createdAt
                  ? formatSmartDate(product.createdAt)
                  : 'No date available'}
              </span>
            </div>
          </div>
          <div className="text-3xl font-bold">
            {product?.price && product.price > 0 ? (
              `${new Intl.NumberFormat('vi-VN').format(product.price)}đ`
            ) : (
              <span className="text-red-500  underline animate-pulse">
                Liên hệ
              </span>
            )}
          </div>
          <p className="prose max-w-none">{product?.content}</p>\
          <div>
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <Badge variant="secondary">{product?.category.name}</Badge>
          </div>
          <div className="pt-4">
            <Button
              onClick={onClick}
              size="lg"
              className="w-full bg-main md:w-auto"
            >
              Liên Hệ Ngay
            </Button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Chi tiết</h3>
          <p className="text-muted-foreground">{product?.description}</p>
        </div>
      </div>
    </Container>
  );
}
