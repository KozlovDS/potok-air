import { cn } from "@/lib/utils";
import React, { ChangeEvent, useState } from "react";
import Popup from "../popup";
import { Button, Input, Textarea } from "@/components/ui";
import { toast } from "sonner";

interface Props {
  className?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const AddFunction: React.FC<Props> = ({
  className,
  isOpen,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const response = await fetch("/api/product/functions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      toast.success("Функция добавлена успешно");
      onOpenChange(false);
      setFormData({ name: "", description: "" });
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

  return (
    <Popup
      className={cn(className)}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Новая функция"
    >
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
        <Input
          name="name"
          placeholder="Название функции"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Описание функции"
          required
          value={formData.description}
          onChange={handleChange}
        />
        <Button variant={"secondary"} type="submit">
          Сохранить функцию
        </Button>
      </form>
    </Popup>
  );
};
