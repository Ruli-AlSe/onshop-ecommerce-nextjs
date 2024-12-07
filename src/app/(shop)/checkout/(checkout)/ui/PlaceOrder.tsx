'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useShallow } from 'zustand/shallow';

import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

import { AddressSkeleton, OrderDetailsSkeleton } from './Skeletons';

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const address = useAddressStore((state) => state.addressDetails);
  const { subtotal, tax, total, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, address);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message!);
      return;
    }

    router.replace(`/orders/${resp.order!.id}`);
    clearCart();
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Address Delivery</h2>
      {loaded ? (
        <div className="mb-10">
          <p className="text-xl mb-2">
            {address.firstName} {address.lastName}
          </p>
          <p>{address.street}</p>
          <p>{address.street2}</p>
          <p>
            {address.colony}, PC: {address.postalCode}
          </p>
          <p>
            {address.city}, {address.state}, {address.country}
          </p>
          <p>{address.phone}</p>
        </div>
      ) : (
        <AddressSkeleton />
      )}

      {/* divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Order details</h2>
      {loaded ? (
        <div className="grid grid-cols-2">
          <span>Products count</span>
          <span className="text-right">
            {itemsInCart === 1 ? '1 article' : `${itemsInCart} articles`}
          </span>

          <span>Subtotal:</span>
          <span className="text-right">{currencyFormat(subtotal)}</span>

          <span>Taxes (15%):</span>
          <span className="text-right">{currencyFormat(tax)}</span>

          <span className="mt-5 text-2xl">Total:</span>
          <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
        </div>
      ) : (
        <OrderDetailsSkeleton />
      )}

      <div className="mt-5 mb-2 w-full">
        {/* disclaimer */}
        <p className="mb-5">
          <span className="text-xs">
            When clicking on &quot;Create order&quot;, you are accepting our{' '}
            <a href="#" className="underline">
              terms and conditions
            </a>{' '}
            and{' '}
            <a href="#" className="underline">
              privacy pollicy.
            </a>
          </span>
        </p>

        <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
        <button
          // href="/orders/123"
          onClick={onPlaceOrder}
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
        >
          Create order
        </button>
      </div>
    </div>
  );
};
