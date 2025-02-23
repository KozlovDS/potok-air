import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        subcategory: {
          some: {
            products: {
              some: {},
            },
          },
        },
      },
      include: {
        subcategory: {
          where: {
            products: {
              some: {},
            },
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
