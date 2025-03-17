import { cn } from "@/lib/utils";
import React, { ChangeEvent, useState } from "react";
import Popup from "../popup";
import { Button, Input } from "@/components/ui";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  className?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const AddSpecification: React.FC<Props> = ({
  className,
  isOpen,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    image?: File;
  }>({ name: "" });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl: string | undefined;

    // Если есть изображение, загружаем его сначала
    if (formData.image) {
      const uploadData = new FormData();
      uploadData.append("image", formData.image);
      const uploadResponse = await fetch("/api/upload-image", {
        method: "POST",
        body: uploadData,
      });

      if (!uploadResponse.ok) {
        console.error("Ошибка при загрузке изображения");
        return;
      }

      const uploadResult = await uploadResponse.json();
      if (uploadResult.success) {
        imageUrl = uploadResult.imageUrl;
      } else {
        console.error(uploadResult.error);
        return;
      }
    }

    // Отправляем данные спецификации в API
    const response = await fetch("/api/product/specification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        imageUrl: imageUrl || "", // Если изображения нет, отправляем пустую строку
      }),
    });

    if (response.ok) {
      toast.success("Спецификация добавлена успешно");

      setFormData({ name: "" });
      setImagePreview(null);
      onOpenChange(false); // Закрываем попап
    } else {
      toast.error("Ошибка " + response.statusText);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: file });
      setImagePreview(previewUrl);
    }
  };

  return (
    <Popup
      className={cn(className)}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Новая спецификация"
    >
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
        <Input
          name="name"
          placeholder="Название спецификации"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Specification Preview"
            width={100}
            height={100}
            className="w-24 h-24 object-cover rounded"
          />
        )}
        <Button variant="secondary" type="submit">
          Сохранить спецификацию
        </Button>
      </form>
    </Popup>
  );
};
