'use server';

import { auth } from '@/auth.config';
import { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productsToOrder: ProductToOrder[], address: Address) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      ok: false,
      message: 'User session does not exists',
    };
  }

  // get all products
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsToOrder.map((p) => p.productId),
      },
    },
  });

  // calculate prices
  const itemsInOrder = productsToOrder.reduce((count, p) => count + p.quantity, 0);
  const { subtotal, tax, total } = productsToOrder.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);

      if (!product) throw new Error(`${item.productId} does not exists - 500`);

      const subtotal = product.price * productQuantity;
      totals.subtotal += subtotal;
      totals.tax += subtotal * 0.15;
      totals.total += subtotal * 1.15;

      return totals;
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  try {
    // create transaction in DB
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1.- update products stock
      const updatedProductsPromises = products.map(async (product) => {
        const productQuantity = productsToOrder
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} does not have a defined quantity`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // search for negative values in stock
      updatedProducts.forEach((p) => {
        if (p.inStock < 0) {
          throw new Error(`${p.title} does not have sufficient stock`);
        }
      });

      // 2.- Create order - header - details
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subtotal,
          tax,
          total,

          orderItem: {
            createMany: {
              data: productsToOrder.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find((pdb) => pdb.id === p.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      // 3.- create order address
      const { country, ...rest } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...rest,
          countryId: country,
          orderId: order.id,
        },
      });

      return { order, orderAddress };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
    };
  } catch (error: unknown) {
    console.error(JSON.stringify(error));

    return {
      ok: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred during transaction',
    };
  }
};
