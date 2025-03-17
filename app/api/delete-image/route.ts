// app/api/delete-image/route.js
import { unlink } from "fs/promises";
import { join } from "path";

export async function DELETE(request: Request) {
  try {
    const { imageUrl } = await request.json();
    const fileName = imageUrl.split("/").pop(); // Извлекаем имя файла из URL
    const filePath = join(process.cwd(), "public/uploads", fileName);

    // Удаляем файл с сервера
    await unlink(filePath);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Ошибка при удалении файла:", error);
    return Response.json(
      { success: false, error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
