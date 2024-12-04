'use client';

import { useEffect, useState } from 'react';

import { getStockBySlug } from '@/actions';
import { QuantitySelector, SizeSelector } from '@/components';
import { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    getStock();
  });

  const getStock = async () => {
    const inStock = await getStockBySlug(product.slug);
    setStock(inStock);
    setIsLoading(false);
  };

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {isLoading ? (
        <AddToCartSkeleton />
      ) : (
        <>
          {posted && !size && (
            <span className="text-red-500 my-2 fade-in">You must to select a size first *</span>
          )}
          {/* sizes selector */}
          <SizeSelector
            sizeSelected={size}
            availableSizes={product.sizes}
            onSizeChanged={setSize}
          />

          {/* quantity selector */}
          <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

          <button onClick={addToCart} className="btn-primary my-5">
            Add to cart
          </button>
        </>
      )}
    </>
  );
};

const AddToCartSkeleton = () => {
  return (
    <>
      <div className="my-5">
        <h3 className="font-bold mb-4">Available sizes</h3>

        <div className="flex">
          {[0, 1, 2, 3].map((size) => (
            <button
              key={size}
              className="mx-2 hover:underline text-lg bg-gray-200 animate-pulse w-5"
            >
              &nbsp;
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        <div className="w-5 bg-gray-200 animate-pulse"></div>
        <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded animate-pulse">&nbsp;</span>
        <div className="w-5 bg-gray-200 animate-pulse"></div>
      </div>

      <div className="w-32 my-5 bg-gray-200 animate-pulse h-10">&nbsp;</div>
    </>
  );
};
