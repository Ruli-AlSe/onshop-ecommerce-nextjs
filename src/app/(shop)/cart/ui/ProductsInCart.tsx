'use client';

import Image from 'next/image';
import { useCartStore } from '@/store';
import { QuantitySelector } from '@/components';
import Link from 'next/link';
import { currencyFormat } from '@/utils';

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug} - ${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px',
            }}
            alt={product.title}
            className="mr-5 rounded"
          />
          <div>
            <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
              {product.size} - {product.title}
            </Link>
            <p className="my-2">{currencyFormat(product.price)}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(value) => updateProductQuantity(product, value)}
            />
            <button onClick={() => removeProduct(product)} className="underline mt-3">
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
