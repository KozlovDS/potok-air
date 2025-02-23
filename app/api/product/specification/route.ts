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
