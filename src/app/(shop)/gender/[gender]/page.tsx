export const revalidate = 60;

import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
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

const getCapitalizedGender = (gender: string) => gender.at(0)?.toUpperCase() + gender.slice(1);

export async function generateMetadata({ params }: Props) {
  const { gender } = await params;
  const label = getCapitalizedGender(gender);

  return {
    title: label,
    description: `${label} clothes`,
    openGraph: {
      title: label,
      description: `${label} articles`,
      images: ['/products/1657932-00-A_0_2000.jpg'],
    },
  };
}

export default async function GenderPage({ params, searchParams }: Props) {
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

  const label = getCapitalizedGender(gender);

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
