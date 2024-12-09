'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const updateUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (!session?.user || session.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Authenticated user must be an administrator',
    };
  }

  try {
    const newRole = role === 'admin' ? 'admin' : 'user';
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: newRole,
      },
    });

    revalidatePath('/admin/users');

    return { ok: true };
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      ok: false,
      message: 'User role not updated',
    };
  }
};
