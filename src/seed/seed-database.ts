import prisma from '../lib/prisma';

import { initialData } from './seed';

async function main() {
  // Remove tables information

  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Insert categories
  const { categories, products, users } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  const categoriesData = categories.map((cat) => ({ name: cat }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  // Insert products and images
  const categoriesDb = await prisma.category.findMany();
  const categoriesMap = categoriesDb.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;

    return map;
  }, {} as Record<string, string>); // => <string -> shirt, string -> categoryId>

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const productDb = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: productDb.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log('Database seeded');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();
