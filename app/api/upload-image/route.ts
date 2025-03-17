import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return Response.json(
        { success: false, error: "Файл не найден" },
        { status: 400 }
      );
    }

    if (!(file instanceof File)) {
      return Response.json(
        { success: false, error: "Неверный формат файла" },
        { status: 400 }
      );
    }
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(process.cwd(), "public/uploads", fileName);
    const buffer = Buffer.from(await (file as File).arrayBuffer());
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;
    return Response.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Ошибка при загрузке:", error);
    return Response.json(
      { success: false, error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
