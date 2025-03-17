import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const products = await prisma.products.findMany({
      where: {
        slider: true,
      },
      include: {
        images: true,
      },
    });
    return NextResponse.json(products);
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
