import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Симуляция базы данных
const users = [
  { username: "kozlovv.ds@ya.ru", password: await bcrypt.hash("password", 10) },
];

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const user = users.find((u) => u.username === username);
    if (!user)
      return NextResponse.json(
        { message: "Пользователь не найден" },
        { status: 401 }
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { message: "Недействительные учетные данные" },
        { status: 401 }
      );

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
