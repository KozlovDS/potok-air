import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const characteristics = await prisma.characteristicsList.findMany({
      orderBy: {
        order_number: "asc",
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

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { name, afterId } = await req.json();

    // Validate that name is provided
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    let orderNumber: number;

    if (afterId) {
      // Find the characteristic after which to insert
      const afterChar = await prisma.characteristicsList.findUnique({
        where: { id: afterId },
        select: { order_number: true },
      });

      if (!afterChar) {
        return NextResponse.json(
          { error: "Characteristic with specified afterId not found" },
          { status: 404 }
        );
      }

      // Set order_number to be right after the found characteristic
      orderNumber = afterChar.order_number + 1;

      // Shift existing characteristics with order_number >= orderNumber
      await prisma.characteristicsList.updateMany({
        where: { order_number: { gte: orderNumber } },
        data: { order_number: { increment: 1 } },
      });
    } else {
      // Add to the end: find the max order_number
      const maxOrderChar = await prisma.characteristicsList.findFirst({
        orderBy: { order_number: "desc" },
        select: { order_number: true },
      });
      orderNumber = maxOrderChar ? maxOrderChar.order_number + 1 : 1;
    }

    // Create the new characteristic
    const newChar = await prisma.characteristicsList.create({
      data: {
        name,
        order_number: orderNumber,
      },
    });

    // Return the created characteristic
    return NextResponse.json(newChar, { status: 201 });
  } catch (error) {
    console.error("Error adding characteristic:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
