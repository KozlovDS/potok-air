import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const subCategories = await prisma.subCategory.findMany({
      where: {
        products: {
          some: {},
        },
      },
    });

    return NextResponse.json(subCategories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
