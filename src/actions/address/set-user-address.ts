'use server';

import { Address } from '@/interfaces';
import prisma from '@/lib/prisma';

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      ok: false,
      message: 'Something went wrong while saving user address',
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const { country, ...rest } = address;
    const addressData = { ...rest, countryId: country, userId };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressData,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressData,
    });

    return updatedAddress;
  } catch (error) {
    console.error(JSON.stringify(error));

    throw new Error('Address not saved');
  }
};
