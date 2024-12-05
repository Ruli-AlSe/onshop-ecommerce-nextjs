import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        images: {
          select: {
            url: true,
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
      images: images.map((image) => image.url),
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    throw new Error('Error obtaining product by slug');
  }
};
