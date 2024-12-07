'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderById = async (orderId: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: 'You must be authenticated',
    };
  }

  try {
    const orderDB = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderAddress: true,
        orderItem: {
          include: {
            product: {
              select: {
                images: { select: { url: true }, take: 1 },
                slug: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!orderDB) {
      throw `Order ${orderId} does not exists`;
    }

    if (session.user.role === 'user') {
      if (session.user.id !== orderDB.userId) throw `Order ${orderId} correspond to other user`;
    }

    const { orderAddress, orderItem, ...order } = orderDB;

    return {
      ok: true,
      orderAddress,
      orderTotals: order,
      orderItems: orderItem.map((item) => {
        const { product, ...rest } = item;

        return {
          ...rest,
          image: product.images[0].url,
          title: product.title,
        };
      }),
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      ok: false,
      message: 'Order not found',
    };
  }
};
