import {
  categories,
  products,
  productImages,
  productModels,
  productCharacteristics,
  productDocuments,
  productSpecifications,
  productAdvantages,
  functionsItem,
} from "../lib/mockdate";
import { prisma } from "./prisma-client";

async function up() {
  for (const item of categories) {
    await prisma.category.upsert({
      where: { name: item.name },
      update: {},
      create: {
        name: item.name,
        subcategory: {
          create: item.subCategories.map((subCategory) => ({
            name: subCategory.name,
          })),
        },
      },
    });
  }

  for (const productSpecification of productSpecifications) {
    await prisma.productSpecification.create({
      data: {
        name: productSpecification.name,
        imageUrl: productSpecification.imageUrl,
      },
    });
  }

  for (const product of products) {
    await prisma.products.create({
      data: {
        name: product.name,
        description: product.description,
        videoLink: product.videoLink,
        subcategory: {
          connect: { id: product.subCategoryId },
        },
        specification: {
          connect: productSpecifications.slice(0, 5),
        },
      },
    });
  }

  for (const productImage of productImages) {
    await prisma.productImages.create({
      data: {
        imageUrl: productImage.imageUrl,
        productId: productImage.productId,
      },
    });
  }

  for (const productModel of productModels) {
    await prisma.productModels.create({
      data: {
        name: productModel.name,
        productId: productModel.productId,
        price: productModel.price,
      },
    });
  }

  for (const productCharacteristic of productCharacteristics) {
    await prisma.productCharacteristics.create({
      data: {
        name: productCharacteristic.name,
        value: productCharacteristic.value,
        productModelId: productCharacteristic.productModelId,
      },
    });
  }

  for (const productDocument of productDocuments) {
    await prisma.productDocuments.create({
      data: {
        name: productDocument.name,
        productId: productDocument.productId,
        url: productDocument.url,
      },
    });
  }

  for (const productDocument of productDocuments) {
    await prisma.productDocuments.create({
      data: {
        name: productDocument.name,
        productId: productDocument.productId,
        url: productDocument.url,
      },
    });
  }

  for (const productAdvantage of productAdvantages) {
    await prisma.productAdvantages.create({
      data: {
        name: productAdvantage.name,
        imageUrl: productAdvantage.imageUrl,
        description: productAdvantage.description,
        productId: productAdvantage.productId,
      },
    });
  }

  await prisma.productFunctions.createMany({
    data: functionsItem,
  });

  await prisma.products.update({
    where: { id: 1 },
    data: {
      functions: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "SubCategory" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Products" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductFunctions" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
