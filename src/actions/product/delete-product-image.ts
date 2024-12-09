'use server';

import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';

import prisma from '@/lib/prisma';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      error: 'Unable to remove images from file system',
    };
  }

  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';

  try {
    await cloudinary.uploader.destroy(imageName, {});
    const deletedImage = await prisma.productImage.delete({
      where: { id: imageId },
      select: {
        product: {
          select: { slug: true },
        },
      },
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      ok: false,
      message: 'Unable to delete product image',
    };
  }
};
