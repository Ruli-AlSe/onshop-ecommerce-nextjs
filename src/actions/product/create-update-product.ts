'use server';

import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { z } from 'zod';

import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.error(productParsed.error);

    return { ok: false };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

  const { id, ...rest } = product;

  try {
    const prismaTX = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags.split(',').map((tag) => tag.trim().toLowerCase());

      if (id) {
        // update product
        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        // create product
        product = await tx.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      // upload images
      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[]);

        if (!images) throw new Error('Something went wrong while uploading images');

        await tx.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return { product };
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/product/${product.slug}`);

    return {
      ok: true,
      product: prismaTX.product,
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      ok: false,
      message: 'Unable to create/update product',
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (img) => {
      try {
        const buffer = await img.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, { folder: 'journal-app' })
          .then((r) => r.secure_url);
      } catch (error) {
        console.error(JSON.stringify(error));
        return null;
      }
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error(JSON.stringify(error));
    return null;
  }
};
