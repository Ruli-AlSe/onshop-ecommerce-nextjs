'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getPaginatedOrders = async () => {
  const session = await auth();

  if (!session?.user || session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'User should be authenticated',
    };
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      orderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return {
    ok: true,
    orders,
  };
};
