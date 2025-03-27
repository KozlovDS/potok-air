import { ChangeEvent, useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, ImageUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddCharacteristic } from "./add-characteristic";
import { toast } from "sonner";
import {
  Product,
  ProductFunctions,
  Specification,
  SubCategory,
} from "@/lib/types";
import { AddCategory } from "./add-category";
import Image from "next/image";
import { AddFunction } from "./add-function";
import { AddSpecification } from "./add-specification";
import { CharacteristicsList } from "@prisma/client";

export default function AddProductPage() {
  // Состояние формы
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    videoLink: "",
    subCategoryId: null,
    slider: false,
    images: [], // Массив объектов { url, alt }
    models: [
      {
        name: "",
        price: "",
        characteristics: [{ name: "", value: "" }],
      },
    ],
    advantages: [{ name: "", imageUrl: "", description: "" }], // Ensure advantages is always an array
    documents: [],
    functions: [],
    specifications: [],
  });

  // Состояние для превью изображений
  const [imagePreviews, setImagePreviews] = useState<
    { previewUrl: string; fileName: string }[]
  >([]);

  // Дополнительные состояния
  const [openAddCharacteristic, setOpenAddCharacteristic] = useState(false);
  const [openAddFunction, setOpenAddFunction] = useState(false);
  const [openAddSpecification, setOpenAddSpecification] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [subCategory, setSubCategory] = useState<SubCategory[]>([]);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [functions, setFunctions] = useState<ProductFunctions[]>([]);
  const [specificationsList, setSpecificationsList] = useState<Specification[]>(
    []
  );
  const [advantageImagePreviews, setAdvantageImagePreviews] = useState<
    { previewUrl: string; fileName: string }[]
  >([]);
  const [characteristics, setCharacteristics] = useState<CharacteristicsList[]>(
    []
  );

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    async function fetchFunctions() {
      const response = await fetch("/api/product/functions");
      const data = await response.json();
      setFunctions(data);
    }
    fetchFunctions();
  }, [openAddFunction]);

  useEffect(() => {
    async function fetchSubCategory() {
      const response = await fetch("/api/category/subcategory");
      const data = await response.json();
      setSubCategory(data);
    }
    fetchSubCategory();
  }, [openAddCategory]);

  useEffect(() => {
    async function fetchSpecifications() {
      const response = await fetch("/api/product/specification");
      const data = await response.json();
      setSpecificationsList(data);
    }
    fetchSpecifications();
  }, [openAddSpecification]);

  useEffect(() => {
    async function fetchCharacteristics() {
      const response = await fetch("/api/characteristics");
      const data = await response.json();
      setCharacteristics(data);
    }
    fetchCharacteristics();
  }, []);

  // Обработчик изменения полей ввода
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Обработчик изменения массивов
  const handleArrayChange = (
    arrayName: keyof Product,
    index: number,
    field: string,
    value: string
  ) => {
    const updatedArray = Array.isArray(formData[arrayName])
      ? [...formData[arrayName]]
      : [];
    if (arrayName === "models" && field.includes("characteristics")) {
      const [charIndex] = field.match(/\d+/) || [];
      const updatedModels = [...(formData.models || [])];
      updatedModels[index].characteristics[parseInt(charIndex || "0")].value =
        value;
      setFormData({ ...formData, models: updatedModels });
    } else {
      updatedArray[index][field as keyof (typeof updatedArray)[0]] = value;
      setFormData({ ...formData, [arrayName]: updatedArray });
    }
  };

  // Обработчик загрузки изображений
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Создаем временные URL для превью
    const newPreviews = files.map((file) => ({
      previewUrl: URL.createObjectURL(file),
      fileName: file.name,
    }));
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    // Загружаем файлы на сервер
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const uploadData = new FormData();
        uploadData.append("image", file);
        const res = await fetch("/api/upload-image", {
          method: "POST",
          body: uploadData,
        });
        const data = await res.json();
        if (data.success) {
          return { imageUrl: data.imageUrl };
        }
        throw new Error(data.error);
      })
    );

    // Обновляем formData.images с реальными URL-ами
    setFormData((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        ...uploadedImages.map((img) => ({
          imageUrl: img.imageUrl,
        })),
      ],
    }));
  };

  // Обработчик удаления изображения
  const handleRemoveImage = async (index: number) => {
    const imageToDelete = formData.images[index]; // Получаем данные об изображении

    try {
      // Отправляем запрос на сервер для удаления файла
      const response = await fetch("/api/delete-image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: imageToDelete.imageUrl }),
      });

      if (response.ok) {
        // Удаляем изображение из состояния приложения
        setFormData((prev) => ({
          ...prev,
          images: prev.images.filter((_, i) => i !== index),
        }));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
      } else {
        console.error("Ошибка при удалении изображения");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  // Обработчик загрузки изображения для преимущества
  const handleAdvantageImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
    advantageIndex: number
  ) => {
    const files = Array.from(e.target.files || []).slice(0, 1); // Берем только первое изображение
    if (files.length === 0) return;

    // Создаем превью только для преимуществ
    const newPreviews = files.map((file) => ({
      previewUrl: URL.createObjectURL(file),
      fileName: file.name,
    }));
    setAdvantageImagePreviews((prev) => [...prev, ...newPreviews]);

    // Загружаем файл на сервер
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const uploadData = new FormData();
        uploadData.append("image", file);
        const res = await fetch("/api/upload-image", {
          method: "POST",
          body: uploadData,
        });
        const data = await res.json();
        if (data.success) {
          return { imageUrl: data.imageUrl };
        }
        throw new Error(data.error);
      })
    );

    // Обновляем только конкретное преимущество
    const updatedAdvantages = [...(formData.advantages || [])];
    updatedAdvantages[advantageIndex].imageUrl = uploadedImages[0].imageUrl;
    setFormData({ ...formData, advantages: updatedAdvantages });

    // Обновляем previewUrl на реальный URL после загрузки
    setAdvantageImagePreviews((prev) =>
      prev.map((preview) =>
        preview.previewUrl === newPreviews[0].previewUrl
          ? { ...preview, previewUrl: uploadedImages[0].imageUrl }
          : preview
      )
    );
  };

  // Обработчик удаления изображения преимущества
  const handleRemoveAdvantageImage = async (index: number) => {
    const imageToDelete = formData.advantages?.[index]?.imageUrl;

    try {
      const response = await fetch("/api/delete-image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: imageToDelete }),
      });

      if (response.ok) {
        const updatedAdvantages = [...(formData.advantages || [])];
        updatedAdvantages[index].imageUrl = "";
        setFormData({ ...formData, advantages: updatedAdvantages });
        setAdvantageImagePreviews((prev) =>
          prev.filter((preview) => preview.previewUrl !== imageToDelete)
        );
      } else {
        console.error("Ошибка при удалении изображения");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  // Добавление нового элемента в массив
  const handleAddField = (arrayName: keyof Product) => {
    const updatedArray = Array.isArray(formData[arrayName])
      ? [...formData[arrayName]]
      : [];
    if (arrayName === "models") {
      updatedArray.push({
        name: "",
        price: "",
        characteristics: [{ name: "", value: "" }],
      });
    } else if (arrayName === "advantages") {
      updatedArray.push({ name: "", imageUrl: "", description: "" });
    } else if (arrayName === "documents") {
      updatedArray.push({ name: "", url: "" });
    }
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Удаление элемента из массива
  const handleRemoveField = (arrayName: keyof Product, index: number) => {
    const updatedArray = Array.isArray(formData[arrayName])
      ? formData[arrayName].filter((_, i) => i !== index)
      : [];
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredFormData = {
      ...formData,
      models: formData.models?.map((model) => ({
        ...model,
        characteristics: model.characteristics.filter(
          (char) => char.value.trim() !== ""
        ),
      })),
    };

    console.log(JSON.stringify(filteredFormData, null, 2));
    const response = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredFormData),
    });

    if (response.ok) {
      toast("Товар успешно добавлен.");
      setFormData({
        id: 0,
        name: "",
        description: "",
        videoLink: "",
        subCategoryId: null,
        slider: false,
        images: [],
        models: [
          {
            name: "",
            price: "",
            characteristics: [],
          },
        ],
        advantages: [{ name: "", imageUrl: "", description: "" }],
        documents: [],
        functions: [],
        specifications: [],
      });
      setImagePreviews([]);
      setAdvantageImagePreviews([]);
    } else {
      toast.error("Ошибка добавления товара: " + response.statusText);
      console.error(response.statusText);
    }
  };

  // Выбор функции
  const handleFunctionSelect = (functionId: number) => {
    const updatedFunctions = [...(formData.functions || [])];
    if (updatedFunctions.includes(functionId)) {
      updatedFunctions.splice(updatedFunctions.indexOf(functionId), 1);
    } else {
      updatedFunctions.push(functionId);
    }
    setFormData({ ...formData, functions: updatedFunctions });
  };

  // Выбор спецификации
  const handleSpecificationSelect = (specificationId: number) => {
    const updatedSpecifications = [...(formData.specifications || [])];
    if (updatedSpecifications.includes(specificationId)) {
      updatedSpecifications.splice(
        updatedSpecifications.indexOf(specificationId),
        1
      );
    } else {
      updatedSpecifications.push(specificationId);
    }
    setFormData({ ...formData, specifications: updatedSpecifications });
  };

  const STYLE = "bg-white p-6 rounded-lg flex flex-col gap-4";

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-4">Добавление товара</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Основные поля */}
        <div className={STYLE}>
          <Input
            name="name"
            placeholder="Название товара"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Textarea
            name="description"
            placeholder="Описание товара"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Input
            name="videoLink"
            placeholder="Ссылка на видео (необязательно)"
            value={formData.videoLink}
            onChange={handleChange}
          />
          <div className="flex gap-4">
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
                  {formData.subCategoryId
                    ? subCategory.find(
                        (cat) => cat.id === formData.subCategoryId
                      )?.name
                    : "Выберите категорию..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-0">
                <Command>
                  <CommandInput
                    placeholder="Поиск категории..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>Категория не найдена.</CommandEmpty>
                    <CommandGroup>
                      {subCategory.length > 0 &&
                        subCategory.map((category) => (
                          <CommandItem
                            key={category.id}
                            value={category.name}
                            onSelect={() => {
                              setFormData({
                                ...formData,
                                subCategoryId: category.id,
                              });
                              setOpenSubCategory(false);
                            }}
                          >
                            {category.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                category.id === formData.subCategoryId
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button onClick={() => setOpenAddCategory(true)}>
              Добавить категорию
            </Button>
          </div>
        </div>

        {/* Изображения с превью */}
        <div className={STYLE}>
          <h3 className="font-semibold">Изображения товара</h3>
          <div className="space-y-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="flex items-center space-x-2 mb-4">
                <Image
                  src={preview.previewUrl}
                  alt={preview.fileName}
                  width={224}
                  height={76}
                  className="w-56 h-auto auto object-cover rounded"
                />
                <span>{preview.fileName}</span>
                <Button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  variant="default"
                >
                  Удалить
                </Button>
              </div>
            ))}
            <div className="mt-4 flex text-sm/6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
              >
                <ImageUp
                  aria-hidden="true"
                  className="mx-auto size-12 text-gray-300"
                />
                <span className="text-center block leading-tight">
                  Загрузить
                  <br /> изображение
                </span>
                <Input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Модели */}
        <div className={STYLE}>
          <h3 className="font-semibold">Модели товара</h3>
          {formData.models?.map((model, index) => (
            <div key={index} className="space-y-2 border p-4 rounded-lg">
              <Input
                name={`models[${index}].name`}
                placeholder={`Название модели #${index + 1}`}
                value={model.name}
                onChange={(e) =>
                  handleArrayChange("models", index, "name", e.target.value)
                }
                required
              />
              <Input
                name={`models[${index}].price`}
                placeholder={`Цена модели #${index + 1}`}
                value={model.price}
                onChange={(e) =>
                  handleArrayChange("models", index, "price", e.target.value)
                }
                required
              />
              <div className="space-y-2 border p-4 rounded-md">
                <h4 className="font-medium">Характеристики</h4>
                {characteristics
                  .sort((a, b) => a.order_number - b.order_number) // Сортировка по order_number
                  .map((char, charIndex) => {
                    const charValue =
                      model.characteristics.find((c) => c.name === char.name)
                        ?.value || "";
                    return (
                      <div
                        key={charIndex}
                        className="border-b flex pb-2 items-center"
                      >
                        <span className="w-1/3">{char.name}</span>
                        <Input
                          placeholder="Значение"
                          value={charValue}
                          onChange={(e) => {
                            const updatedModels = [...(formData.models || [])];
                            const newValue = e.target.value.trim();
                            const existingCharIndex = updatedModels[
                              index
                            ].characteristics.findIndex(
                              (c) => c.name === char.name
                            );

                            if (newValue === "" && existingCharIndex !== -1) {
                              // Удаляем характеристику, если значение стало пустым
                              updatedModels[index].characteristics.splice(
                                existingCharIndex,
                                1
                              );
                            } else if (newValue !== "") {
                              if (existingCharIndex !== -1) {
                                // Обновляем значение существующей характеристики
                                updatedModels[index].characteristics[
                                  existingCharIndex
                                ].value = newValue;
                              } else {
                                // Добавляем новую характеристику в правильном порядке
                                const updatedCharacteristics = characteristics
                                  .map((c) => {
                                    if (c.name === char.name) {
                                      return { name: c.name, value: newValue };
                                    }
                                    const existingChar = updatedModels[
                                      index
                                    ].characteristics.find(
                                      (ec) => ec.name === c.name
                                    );
                                    return existingChar || undefined;
                                  })
                                  .filter((c) => c !== undefined); // Убираем undefined
                                updatedModels[index].characteristics =
                                  updatedCharacteristics as {
                                    name: string;
                                    value: string;
                                  }[];
                              }
                            }
                            setFormData({ ...formData, models: updatedModels });
                          }}
                          className="w-2/3"
                        />
                      </div>
                    );
                  })}
                <Button
                  type="button"
                  onClick={() => setOpenAddCharacteristic(true)}
                >
                  Добавить новую характеристику
                </Button>
              </div>
              <Button
                type="button"
                onClick={() => handleRemoveField("models", index)}
              >
                Удалить модель
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => handleAddField("models")}>
            Добавить модель
          </Button>
        </div>

        {/* Преимущества */}
        <div className={STYLE}>
          <h3 className="font-semibold">Преимущества товара</h3>
          {formData.advantages?.map((advantage, index) => {
            // Находим соответствующее превью для этого преимущества
            const preview = advantageImagePreviews.find(
              (p) =>
                p.previewUrl === advantage.imageUrl ||
                p.fileName === advantage.imageUrl
            );

            return (
              <div key={index} className="space-y-2 border p-4 rounded-lg">
                <Input
                  name={`advantages[${index}].name`}
                  placeholder={`Название преимущества #${index + 1}`}
                  value={advantage.name}
                  onChange={(e) =>
                    handleArrayChange(
                      "advantages",
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />
                <div className="space-y-2">
                  {advantage.imageUrl && (
                    <div className="flex items-center space-x-2">
                      <Image
                        src={preview?.previewUrl || advantage.imageUrl}
                        alt={advantage.name || `Преимущество ${index + 1}`}
                        width={256}
                        height={100}
                        className="w-64 h-auto object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleRemoveAdvantageImage(index)}
                      >
                        Удалить
                      </Button>
                    </div>
                  )}
                  {!advantage.imageUrl && (
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="advantage-image-upload"
                        className="relative cursor-pointer mb-4 rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                      >
                        <ImageUp
                          aria-hidden="true"
                          className="mx-auto size-12 text-gray-300"
                        />
                        <span className="text-center block leading-tight">
                          Загрузить
                          <br /> изображение
                        </span>
                        <Input
                          type="file"
                          id="advantage-image-upload"
                          accept="image/*"
                          onChange={(e) => handleAdvantageImageChange(e, index)}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  )}
                </div>
                <Textarea
                  name={`advantages[${index}].description`}
                  placeholder={`Описание преимущества #${index + 1}`}
                  value={advantage.description}
                  onChange={(e) =>
                    handleArrayChange(
                      "advantages",
                      index,
                      "description",
                      e.target.value
                    )
                  }
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveField("advantages", index)}
                >
                  Удалить преимущество
                </Button>
              </div>
            );
          })}
          <Button type="button" onClick={() => handleAddField("advantages")}>
            Добавить преимущество
          </Button>
        </div>

        {/* Документы */}
        <div className={STYLE}>
          <h3 className="font-semibold">Документы товара</h3>
          {formData.documents?.map((document, index) => (
            <div key={index} className="space-y-2 border p-4 rounded-lg">
              <Input
                name={`documents[${index}].name`}
                placeholder={`Название документа #${index + 1}`}
                value={document.name}
                onChange={(e) =>
                  handleArrayChange("documents", index, "name", e.target.value)
                }
              />
              <Input
                name={`documents[${index}].url`}
                placeholder={`Ссылка на документ #${index + 1}`}
                value={document.url}
                onChange={(e) =>
                  handleArrayChange("documents", index, "url", e.target.value)
                }
              />
              <Button
                type="button"
                onClick={() => handleRemoveField("documents", index)}
              >
                Удалить документ
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => handleAddField("documents")}>
            Добавить документ
          </Button>
        </div>

        {/* Функции */}
        <div className={STYLE}>
          <h3 className="font-semibold">Функции товара</h3>
          <div className="space-y-2">
            {functions.length > 0 &&
              functions.map((func) => (
                <label key={func.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={func.id}
                    checked={formData.functions?.includes(func.id)}
                    onChange={() => handleFunctionSelect(func.id)}
                  />
                  <span>{func.name}</span>
                </label>
              ))}
          </div>
          <Button type="button" onClick={() => setOpenAddFunction(true)}>
            Добавить функцию
          </Button>
        </div>

        {/* Спецификации */}
        <div className={STYLE}>
          <h3 className="font-semibold">Спецификации товара</h3>
          <div className="space-y-2">
            {specificationsList.length > 0 &&
              specificationsList.map((spec) => (
                <label key={spec.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={spec.id}
                    checked={formData.specifications?.includes(spec.id)}
                    onChange={() => handleSpecificationSelect(spec.id)}
                  />
                  <span>{spec.name}</span>
                </label>
              ))}
          </div>
          <Button type="button" onClick={() => setOpenAddSpecification(true)}>
            Добавить спецификацию
          </Button>
        </div>
        <div className={STYLE}>
          <label className="flex gap-2">
            <input
              type="checkbox"
              name="slider"
              checked={formData.slider}
              onChange={(e) =>
                setFormData({ ...formData, slider: e.target.checked })
              }
            />
            Отображать товар в слайдере
          </label>
        </div>

        <Button variant="secondary" type="submit">
          Сохранить товар
        </Button>
      </form>
      <AddCharacteristic
        isOpen={openAddCharacteristic}
        onOpenChange={setOpenAddCharacteristic}
        setCharacteristics={setCharacteristics}
        characteristics={characteristics}
      />
      <AddCategory isOpen={openAddCategory} onOpenChange={setOpenAddCategory} />
      <AddFunction isOpen={openAddFunction} onOpenChange={setOpenAddFunction} />
      <AddSpecification
        isOpen={openAddSpecification}
        onOpenChange={setOpenAddSpecification}
      />
    </div>
  );
}
