import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const subCategoryId = parseInt(
    url.searchParams.get("subCategoryId") || "0",
    10
  );

  try {
    const products = await prisma.products.findMany({
      where: {
        subCategoryId: subCategoryId,
      },
      include: {
        // Добавляем включение изображений
        images: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(products);
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
