'use client';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const OrderSummary = () => {
  const [loading, setLoading] = useState(true);
  const getSummaryInformation = useCartStore(useShallow((state) => state.getSummaryInformation()));
  const { subtotal, tax, total, itemsInCart } = getSummaryInformation;

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="grid grid-cols-2">
      {loading ? (
        <OrderSummarySkeleton />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

const OrderSummarySkeleton = () => {
  return (
    <>
      <span>Products count</span>
      <span className="text-right bg-gray-200 animate-pulse w-2/3 justify-self-end" />

      <span>Subtotal:</span>
      <span className="text-right bg-gray-200 animate-pulse w-2/3 justify-self-end" />

      <span>Taxes (15%):</span>
      <span className="text-right bg-gray-200 animate-pulse w-2/3 justify-self-end" />

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right bg-gray-200 animate-pulse w-2/3  justify-self-end" />
    </>
  );
};
