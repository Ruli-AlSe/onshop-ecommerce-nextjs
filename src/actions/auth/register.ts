'use server';

import bcryptjs from 'bcryptjs';

import prisma from '@/lib/prisma';

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user,
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      ok: false,
      message: 'Something went wrong while creating the user',
    };
  }
};
