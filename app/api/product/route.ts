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
          functions: {
            include: {
              category: true,
            },
          },
        },
      });
    }
    if (product && product.functions.length > 0) {
      const functionCategories = product.functions.map(
        (functionItem) => functionItem.category
      );
      const uniqueFunctionCategoryNames = functionCategories.filter(
        (category, index, self) =>
          index === self.findIndex((c) => c.id === category.id)
      );
      return NextResponse.json({
        ...product,
        functionCategory: uniqueFunctionCategoryNames,
      });
    } else {
      return NextResponse.json(product);
    }
  } catch (error) {
    console.error("Ошибка при запросе продукта:", error); // Обработка ошибок
    return NextResponse.json(null);
  }
}
