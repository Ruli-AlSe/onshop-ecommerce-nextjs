import Image from 'next/image';
import Link from 'next/link';

import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed/seed';

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more items</span>
            <Link href="/" className="underline mb-5">
              Continue shopping
            </Link>

            {/* items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
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
                  <p>{product.title}</p>
                  <p>${product.price.toFixed(2)}</p>
                  <QuantitySelector quantity={3} />
                  <button className="underline mt-3">Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* checkout - order details */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Order details</h2>

            <div className="grid grid-cols-2">
              <span>Products count</span>
              <span className="text-right">3 articles</span>

              <span>Subtotal:</span>
              <span className="text-right">$100.00</span>

              <span>Taxes (15%):</span>
              <span className="text-right">$15.00</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$115.00</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link href="/checkout/address" className="flex btn-primary justify-center">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
