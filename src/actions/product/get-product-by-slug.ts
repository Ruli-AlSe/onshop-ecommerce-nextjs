import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        images: {
          select: {
            url: true,
            id: true,
          },
        },
      },
      where: {
        slug,
      },
    });

    if (!product) return null;

    const { images, ...rest } = product;

    return {
      ...rest,
      images: images.map((image) => ({ url: image.url, id: image.id })),
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    throw new Error('Error obtaining product by slug');
  }
};
