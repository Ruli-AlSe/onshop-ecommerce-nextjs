'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Product } from '@/interfaces';
import { currencyFormat } from '@/utils';

import { ProductImage } from '../product-image/ProductImage';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState<string>(product.images[0] as string);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <div
          onMouseEnter={() => setDisplayImage(product.images[1] as string)}
          onMouseLeave={() => setDisplayImage(product.images[0] as string)}
        >
          <ProductImage
            src={displayImage as string}
            alt={product.title}
            className="w-full object-cover rounded"
            width={500}
            height={500}
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col">
        <Link href={`/product/${product.slug}`} className="hover:text-blue-500">
          {product.title}
        </Link>
        <span className="font-bold">{currencyFormat(product.price)}</span>
      </div>
    </div>
  );
};
