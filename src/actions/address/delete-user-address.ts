'use server';

import prisma from '@/lib/prisma';

export const deleteUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findFirst({
      where: { userId },
    });

    if (!address) return { ok: true };

    await prisma.userAddress.delete({
      where: { userId },
    });

    return { ok: true };
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      ok: false,
      message: 'There was an issue while deleting user address',
    };
  }
};
