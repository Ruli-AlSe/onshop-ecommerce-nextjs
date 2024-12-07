import Link from 'next/link';

import { Title } from '@/components';

import { PlaceOrder } from './ui/PlaceOrder';
import { ProductsInCart } from './ui/ProductsInCart';

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1100px]">
        <Title title="Order verification" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more items</span>
            <Link href="/cart" className="underline mb-5">
              Edit cart
            </Link>

            {/* items */}
            <ProductsInCart />
          </div>

          {/* checkout - order details */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
