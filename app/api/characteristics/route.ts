import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const characteristics = await prisma.productCharacteristics.findMany({
      distinct: ["name"],
      select: {
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(characteristics);
  } catch (error) {
    console.error("Ошибка при получении характеристик:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
