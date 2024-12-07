import Image from 'next/image';
import { redirect } from 'next/navigation';
import clsx from 'clsx';
import { IoCartOutline } from 'react-icons/io5';

import { getOrderById } from '@/actions';
import { PaypalButton, Title } from '@/components';
import { currencyFormat } from '@/utils';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  const resp = await getOrderById(id);

  if (!resp.ok) {
    redirect('/');
  }
  const { orderAddress, orderItems, orderTotals } = resp;
  const { isPaid, itemsInOrder, subtotal, tax, total, id: orderId } = orderTotals!;
  const {
    street,
    street2,
    firstName,
    lastName,
    colony,
    postalCode,
    city,
    state,
    countryId,
    phone,
  } = orderAddress!;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order # ${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 test-sx font-bold text-white mb-5',
                {
                  'bg-red-500': !isPaid,
                  'bg-green-700': isPaid,
                }
              )}
            >
              <IoCartOutline size={30} />
              {!isPaid ? (
                <span className="mx-2">Payment pending</span>
              ) : (
                <span className="mx-2">Paid order</span>
              )}
            </div>

            {/* items */}
            {orderItems!.map((product) => (
              <div key={product.id} className="flex mb-5">
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
                  <p>{product.title}</p>
                  <p>
                    {currencyFormat(product.price)} x {product.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(product.price * product.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout - order details */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Address Delivery</h2>
            <div className="mb-10">
              <p className="text-xl">
                {firstName} {lastName}
              </p>
              <p>{street}</p>
              <p>{street2}</p>
              <p>
                {colony}, PC: {postalCode}
              </p>
              <p>
                {city}, {state}, {countryId}
              </p>
              <p>{phone}</p>
            </div>

            {/* divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order details</h2>
            <div className="grid grid-cols-2">
              <span>Products count</span>
              <span className="text-right">
                {itemsInOrder > 1 ? `${itemsInOrder} articles` : `${itemsInOrder} article`}
              </span>

              <span>Subtotal:</span>
              <span className="text-right">{currencyFormat(subtotal)}</span>

              <span>Taxes (15%):</span>
              <span className="text-right">{currencyFormat(tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {!isPaid ? (
                <PaypalButton orderId={orderId} amount={total} />
              ) : (
                <div className="flex items-center rounded-lg py-2 px-3.5 test-sx font-bold text-white mb-5 bg-green-700">
                  <IoCartOutline size={30} />
                  <span className="mx-2">Paid order</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
