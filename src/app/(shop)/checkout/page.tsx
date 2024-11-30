import Image from 'next/image';
import Link from 'next/link';

import { Title } from '@/components';
import { initialData } from '@/seed/seed';

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

export default function CcheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Order verification" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more items</span>
            <Link href="/cart" className="underline mb-5">
              Edit cart
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
                  <p>${product.price.toFixed(2)} x 3</p>
                  <p className="font-bold">Subtotal: ${(product.price * 3).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout - order details */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Address Delivery</h2>
            <div className="mb-10">
              <p className="text-xl">Raul Almanza</p>
              <p>Evergreen Av. 123</p>
              <p>Backstage neighborhood</p>
              <p>Ciudad de Mexico</p>
              <p>C.P. 33333</p>
              <p>12321.12321.12312</p>
            </div>

            {/* divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

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

              <Link href="/orders/123" className="flex btn-primary justify-center">
                Create order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
