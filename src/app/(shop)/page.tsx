import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions/product/product-pagination';
import { Pagination, ProductGrid, Title } from '@/components';

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const { page: searchPage } = await searchParams;

  const page = searchPage ? parseInt(searchPage) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title title="Store" subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
