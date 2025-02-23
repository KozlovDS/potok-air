import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    let product;
    if (id) {
      product = await prisma.products.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          images: true,
          models: {
            include: {
              characteristics: true,
            },
          },
          specification: true,
          documents: true,
          advantages: true,
          functions: true,
        },
      });
    }

    return NextResponse.json(product || null); // Ensure not to pass undefined to NextResponse.json
  } catch (error) {
    console.error("Ошибка при запросе продукта:", error); // Обработка ошибок
    return NextResponse.json(
      { error: "Ошибка при запросе продукта" },
      { status: 500 }
    ); // Return an object
  }
}

export async function POST(request: Request) {
  const {
    name,
    imageUrl,
    description,
    videoLink,
    subCategoryId,
    images,
    models,
    documents,
    advantages,
    specifications,
    functions,
  } = await request.json();

  try {
    const newProduct = await prisma.products.create({
      data: {
        name,
        imageUrl,
        description,
        videoLink,
        subCategoryId,
        images: {
          create: images.map((image: { imageUrl: string }) => ({
            imageUrl: image.imageUrl,
          })),
        },
        models: {
          create: models.map(
            (model: {
              name: string;
              price: number;
              characteristics: { name: string; value: string }[];
            }) => ({
              name: model.name,
              price: Number(model.price),
              characteristics: {
                create: model.characteristics.map((char) => ({
                  name: char.name,
                  value: char.value,
                })),
              },
            })
          ),
        },
        functions: {
          connect: functions.map((func: number) => ({
            id: func,
          })),
        },
        specification: {
          connect: specifications.map((spec: number) => ({
            id: spec,
          })),
        },
        documents: {
          create: documents.map((doc: { name: string; url: string }) => ({
            name: doc.name,
            url: doc.url,
          })),
        },
        advantages: {
          create: advantages.map(
            (adv: { name: string; imageUrl: string; description: string }) => ({
              name: adv.name,
              imageUrl: adv.imageUrl,
              description: adv.description,
            })
          ),
        },
      },
    });

    if (!newProduct) {
      console.error("Ошибка: newProduct is null or undefined");
      return NextResponse.json(
        {
          errorMessage: "Ошибка при добавлении товара",
          error: "Не удалось создать товар",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    console.error("Ошибка при добавлении товара:", error);
    return NextResponse.json(
      {
        errorMessage: "Ошибка при добавлении товара",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
