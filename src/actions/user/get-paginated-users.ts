'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (!session?.user || session.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Authenticated user must be an administrator',
    };
  }

  const users = await prisma.user.findMany({
    orderBy: {
      name: 'desc',
    },
  });

  return {
    ok: true,
    users,
  };
};
