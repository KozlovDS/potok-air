import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const categoryId = parseInt(url.searchParams.get("categoryId") || "0", 10);

  try {
    let products;
    if (categoryId === 0) {
      products = await prisma.subCategory.findMany({
        where: {
          products: {
            some: {},
          },
        },
        include: {
          products: {
            include: {
              // Добавляем включение изображений
              images: true,
            },
          },
        },
      });
    } else {
      products = await prisma.subCategory.findMany({
        where: {
          categoryId,
          products: {
            some: {},
          },
        },
        include: {
          products: {
            include: {
              // Добавляем включение изображений
              images: true,
            },
          },
        },
        orderBy: {
          id: "asc",
        },
      });
    }
    return NextResponse.json(products);
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
