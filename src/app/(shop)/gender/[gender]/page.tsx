export const revalidate = 60;

import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions/product/product-pagination';
import { Pagination, ProductGrid, Title } from '@/components';
import { Gender } from '@prisma/client';

interface Props {
  params: Promise<{
    gender: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page: searchPage } = await searchParams;

  const page = searchPage ? parseInt(searchPage) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const label = gender.at(0)?.toUpperCase() + gender.slice(1);

  return (
    <>
      <Title
        title={`${label} articles`}
        subtitle={`The best products for ${label.toLowerCase()}`}
        className="mb-2"
      />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
