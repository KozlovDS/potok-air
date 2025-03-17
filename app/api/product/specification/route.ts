import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const specifications = await prisma.productSpecification.findMany({
      distinct: ["name"],
    });

    return NextResponse.json(specifications);
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
    const body = await request.json();
    const { name, imageUrl } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Название обязательно" },
        { status: 400 }
      );
    }

    const specification = await prisma.productSpecification.create({
      data: {
        name,
        imageUrl: imageUrl || null, // Если imageUrl не передан, записываем null
      },
    });

    return NextResponse.json({ success: true, specification }, { status: 201 });
  } catch (error) {
    console.error("Ошибка при создании спецификации:", error);
    return NextResponse.json(
      { success: false, error: "Ошибка сервера" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
