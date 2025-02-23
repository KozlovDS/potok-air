import { NextResponse } from "next/server";

export function GET() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
