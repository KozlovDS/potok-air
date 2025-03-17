import { cn } from "@/lib/utils";
import React, { ChangeEvent, useEffect, useState } from "react";
import Popup from "../popup";
import { Button, Input } from "@/components/ui";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Category } from "@prisma/client";

interface Props {
  className?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const AddCategory: React.FC<Props> = ({
  className,
  isOpen,
  onOpenChange,
}) => {
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const response = await fetch("/api/category/subcategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      toast.success("Категория добавлена успешно");
      onOpenChange(false);
    } else {
      toast.error("Ошибка " + response.statusText);

      console.error(response.statusText);
    }
  };

  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);
  const [formData, setFormData] = useState<{
    categoryId: number | null;
    categoryName: string;
    name: string;
  }>({
    categoryId: null,
    categoryName: "",
    name: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    async function fetchCategory() {
      const response = await fetch("/api/category");
      const data = await response.json();
      setCategory(data);
    }

    fetchCategory();
  }, [isOpen]);

  return (
    <Popup
      className={cn(className)}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Добавить подкатегорию"
    >
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
        <p className="mt-1 text-sm/6 text-gray-600">
          Выберите категорию или добавьте новую
        </p>
        <Popover
          open={openSubCategory}
          onOpenChange={() => setOpenSubCategory(!openSubCategory)}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openSubCategory}
              className="justify-between"
            >
              {formData.categoryId && category
                ? category.find((cat) => cat.id === formData.categoryId)?.name
                : "Выберите категорию..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-white p-0">
            <Command>
              <CommandInput placeholder="Поиск категории..." className="h-9" />
              <CommandList>
                <CommandEmpty>Категория не найдена.</CommandEmpty>
                <CommandGroup>
                  {category.length > 0
                    ? category.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.name}
                          onSelect={() => {
                            setFormData({
                              ...formData,
                              categoryId: category.id,
                            }); // обновляем subCategoryId
                            setOpenSubCategory(false); // закрываем поповер после выбора
                          }}
                        >
                          {category.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              category.id === formData.categoryId
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))
                    : ""}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {formData.categoryId === null && (
          <Input
            name="categoryName"
            placeholder="Название категории"
            value={formData.categoryName}
            onChange={handleChange}
            required
          />
        )}

        <Input
          name="name"
          placeholder="Название подкатегории"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Button variant={"secondary"} type="submit">
          Сохранить подкатегорию
        </Button>
      </form>
    </Popup>
  );
};
