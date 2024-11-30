import { notFound } from 'next/navigation';

import { ProductGrid, Title } from '@/components';
import { initialData } from '@/seed/seed';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const products = initialData.products;

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const filteredProducts = products.filter((product) => product.gender === id);
  const label = id.at(0)?.toUpperCase() + id.slice(1);

  if (filteredProducts.length === 0) {
    notFound();
  }

  return (
    <>
      <Title
        title={`${label} articles`}
        subtitle={`The best products for ${label.toLowerCase()}`}
        className="mb-2"
      />

      <ProductGrid products={filteredProducts} />
    </>
  );
}
