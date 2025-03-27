import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { username, email, phone, city, productName, productModel } =
      await req.json();

    if (!username || !email || !phone || !city) {
      return NextResponse.json(
        { message: "Все поля обязательны" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: `"Потокэир.рф" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: "Заявка на расчет",
      html: `<h2>Новая заявка на расчет</h2>
             <p><strong>Имя:</strong> ${username}</p>
             <p><strong>Телефон:</strong> ${phone}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Город:</strong> ${city}</p>
             <br/>
             <h2>Продукт</h2>
             <p><strong>Наименование:</strong> ${productName}</p>
             <p><strong>Модель:</strong> ${productModel}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Письмо отправлено:", info.messageId);

    return NextResponse.json({
      message: "Письмо успешно отправлено",
      status: 200,
    });
  } catch (error: unknown) {
    console.error("❌ Ошибка отправки письма:", error || error);
    return NextResponse.json(
      {
        message: "Ошибка отправки письма",
        error: String(error) || "Неизвестная ошибка",
      },
      { status: 500 }
    );
  }
}
