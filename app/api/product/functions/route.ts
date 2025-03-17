import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const functions = await prisma.productFunctions.findMany();

    return NextResponse.json(functions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" }, // Ensure an object is returned
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    const functions = await prisma.productFunctions.create({
      data: {
        name,
        description,
      },
    });
    return NextResponse.json(functions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" }, // Ensure an object is returned
      { status: 500 }
    );
  }
}
