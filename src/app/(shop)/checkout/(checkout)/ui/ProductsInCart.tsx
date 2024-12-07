'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const ProductsInCart = () => {
  const router = useRouter();
  const productsInCart = useCartStore((state) => state.cart);

  if (productsInCart.length === 0) {
    router.replace('/empty');
  }

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
            <span>
              {product.size} - {product.title} x({product.quantity})
            </span>
            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
