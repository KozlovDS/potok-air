import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
