import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const subCategories = await prisma.subCategory.findMany();

    return NextResponse.json(subCategories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, categoryId, categoryName } = await request.json();

    if (categoryName === "") {
      const subCategory = await prisma.subCategory.create({
        data: {
          name,
          categoryId: Number(categoryId),
        },
      });
      return NextResponse.json(subCategory);
    } else {
      const category = await prisma.category.create({
        data: {
          name: categoryName,
          subcategory: {
            create: [
              {
                name,
              },
            ],
          },
        },
      });
      return NextResponse.json(category);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
