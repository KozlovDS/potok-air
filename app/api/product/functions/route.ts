import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const functions = await prisma.productFunctions.findMany();

    return NextResponse.json(functions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
