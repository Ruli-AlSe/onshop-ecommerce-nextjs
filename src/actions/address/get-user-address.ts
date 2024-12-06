'use server';

import prisma from '@/lib/prisma';

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({ where: { userId } });

    if (!address) return null;

    const { countryId, street2, ...rest } = address;

    return {
      ...rest,
      street2: street2 ?? '',
      country: countryId,
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    return null;
  }
};
