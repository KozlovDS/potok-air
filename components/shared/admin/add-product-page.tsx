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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProductFunctions {
  id: number;
  name: string;
  description: string;
}

interface SubCategory {
  id: number;
  name: string;
}

interface Images {
  imageUrl: string;
}

interface Characteristic {
  name: string;
  value: string;
}

interface Models {
  name: string;
  price: string;
  characteristics: Characteristic[];
}

interface Advantages {
  name: string;
  imageUrl: string;
  description: string;
}

interface Documents {
  name: string;
  url: string;
}

interface Specification {
  id: number;
  name: string;
}

interface Product {
  name: string;
  imageUrl: string;
  description: string;
  videoLink: string;
  subCategoryId: number | null;
  images: Images[];
  models: Models[];
  advantages: Advantages[];
  documents: Documents[];
  functions: number[];
  specifications: number[];
}
export default function AddProductPage() {
  const [formData, setFormData] = useState<Product>({
    name: "",
    imageUrl: "",
    description: "",
    videoLink: "",
    subCategoryId: null,
    images: [{ imageUrl: "" }],
    models: [
      {
        name: "",
        price: "",
        characteristics: [{ name: "", value: "" }],
      },
    ],
    advantages: [{ name: "", imageUrl: "", description: "" }],
    documents: [{ name: "", url: "" }],
    functions: [],
    specifications: [],
  });

  const [subCategory, setSubCategory] = useState<SubCategory[]>([]);
  const [openSubCategory, setOpenSubCategory] = useState(false);

  const [functions, setFunctions] = useState<ProductFunctions[]>([]);
  const [specificationsList, setSpecificationsList] = useState<Specification[]>(
    []
  );

  const [characteristics, setCharacteristics] = useState<string[]>([]);
  const [comboboxOpen, setComboboxOpen] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    async function fetchCharacteristics() {
      const response = await fetch("/api/characteristics");
      const data = await response.json();
      setCharacteristics(data.map((char: { name: string }) => char.name));
    }
    async function fetchSubCategory() {
      const response = await fetch("/api/category/subcategory");
      const data = await response.json();
      setSubCategory(data);
    }
    async function fetchFunctions() {
      const response = await fetch("/api/product/functions");
      const data = await response.json();
      setFunctions(data);
    }
    async function fetchSpecifications() {
      const response = await fetch("/api/product/specification");
      const data = await response.json();
      setSpecificationsList(data);
    }
    fetchSpecifications();
    fetchFunctions();
    fetchSubCategory();
    fetchCharacteristics();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
      const updatedModels = [...formData.models];
      updatedModels[index].characteristics[parseInt(charIndex || "0")].value =
        value;
      setFormData({ ...formData, models: updatedModels });
    } else {
      updatedArray[index][field as keyof (typeof updatedArray)[0]] = value;
      setFormData({ ...formData, [arrayName]: updatedArray });
    }
  };

  const handleAddField = (arrayName: keyof Product) => {
    const updatedArray = Array.isArray(formData[arrayName])
      ? [...formData[arrayName]]
      : [];

    if (arrayName === "images") {
      updatedArray.push({ imageUrl: "" });
    } else if (arrayName === "models") {
      updatedArray.push({
        name: "",
        price: "",
        characteristics: [{ name: "", value: "" }],
      });
    } else if (arrayName === "advantages") {
      updatedArray.push({ name: "", imageUrl: "", description: "" });
    } else if (arrayName === "documents") {
      updatedArray.push({ name: "", url: "" });
    } else if (arrayName === "functions") {
      return;
    } else if (arrayName === "specifications") {
      return;
    }
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const handleAddCharacteristic = (modelIndex: number) => {
    const updatedModels = [...formData.models];
    updatedModels[modelIndex].characteristics.push({
      name: "",
      value: "",
    });
    setFormData({ ...formData, models: updatedModels });
  };

  const handleRemoveField = (arrayName: keyof Product, index: number) => {
    const updatedArray = Array.isArray(formData[arrayName])
      ? formData[arrayName].filter((_, i) => i !== index)
      : [];
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const handleRemoveCharacteristic = (
    modelIndex: number,
    charIndex: number
  ) => {
    const updatedModels = [...formData.models];
    updatedModels[modelIndex].characteristics = updatedModels[
      modelIndex
    ].characteristics.filter((_, i) => i !== charIndex);
    setFormData({ ...formData, models: updatedModels });
  };

  const handleCharacteristicSelect = (
    modelIndex: number,
    charIndex: number,
    selectedName: string
  ) => {
    const updatedModels = [...formData.models];
    updatedModels[modelIndex].characteristics[charIndex].name = selectedName;
    updatedModels[modelIndex].characteristics[charIndex].value = ""; // Сброс значения при выборе новой характеристики
    setFormData({ ...formData, models: updatedModels });
    toggleCombobox(`models[${modelIndex}].characteristics[${charIndex}].name`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2));
    const response = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      console.log("Товар добавлен успешно");
    } else {
      console.error(response.statusText);
    }
  };

  const toggleCombobox = (key: string) => {
    setComboboxOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFunctionSelect = (functionId: number) => {
    const updatedFunctions = [...formData.functions];
    if (updatedFunctions.includes(functionId)) {
      updatedFunctions.splice(updatedFunctions.indexOf(functionId), 1);
    } else {
      updatedFunctions.push(functionId);
    }
    setFormData({ ...formData, functions: updatedFunctions });
  };

  const handleSpecificationSelect = (specificationId: number) => {
    const updatedSpecifications = [...formData.specifications];
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

  const getAvailableCharacteristics = (modelIndex: number): string[] => {
    const selectedCharacteristics = formData.models[
      modelIndex
    ].characteristics.map((char) => char.name);
    return characteristics.filter(
      (char) => !selectedCharacteristics.includes(char)
    );
  };

  const STYLE = "bg-white p-6 rounded-lg flex flex-col gap-4";
  return (
    <div className="mx-auto ">
      <h1 className="text-2xl font-bold mb-4">Добавление товара</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={STYLE}>
          <Input
            name="name"
            placeholder="Название товара"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="imageUrl"
            placeholder="Ссылка на изображение"
            value={formData.imageUrl}
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
                  ? subCategory.find((cat) => cat.id === formData.subCategoryId)
                      ?.name
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
                    {subCategory.length > 0
                      ? subCategory.map((category) => (
                          <CommandItem
                            key={category.id}
                            value={category.name}
                            onSelect={() => {
                              setFormData({
                                ...formData,
                                subCategoryId: category.id,
                              }); // обновляем subCategoryId
                              setOpenSubCategory(false); // закрываем поповер после выбора
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
                        ))
                      : ""}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Динамические поля для изображений */}
        <div className={STYLE}>
          <h3 className="font-semibold">Изображения товара</h3>
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                name={`images[${index}].imageUrl`}
                placeholder={`Ссылка на изображение #${index + 1}`}
                value={image.imageUrl}
                onChange={(e) =>
                  handleArrayChange("images", index, "imageUrl", e.target.value)
                }
                required
              />
              <Button
                type="button"
                onClick={() => handleRemoveField("images", index)}
              >
                Удалить
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => handleAddField("images")}>
            Добавить изображение
          </Button>
        </div>

        {/* Динамические поля для моделей */}
        <div className={STYLE}>
          <h3 className="font-semibold">Модели товара</h3>
          {formData.models.map((model, index) => (
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
              {/* Характеристики модели */}
              {model.characteristics.map((char, charIndex) => (
                <div key={charIndex} className="flex space-x-2">
                  <Popover
                    open={
                      comboboxOpen[
                        `models[${index}].characteristics[${charIndex}].name`
                      ]
                    }
                    onOpenChange={() =>
                      toggleCombobox(
                        `models[${index}].characteristics[${charIndex}].name`
                      )
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={
                          comboboxOpen[
                            `models[${index}].characteristics[${charIndex}].name`
                          ]
                        }
                        className="justify-between"
                      >
                        {char.name ? char.name : "Выберите характеристику..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white p-0">
                      <Command>
                        <CommandInput
                          placeholder="Поиск характеристики..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>
                            Характеристика не найдена.
                          </CommandEmpty>
                          <CommandGroup>
                            {getAvailableCharacteristics(index).map(
                              (characteristic) => (
                                <CommandItem
                                  key={characteristic}
                                  value={characteristic}
                                  onSelect={(currentValue) => {
                                    handleCharacteristicSelect(
                                      index,
                                      charIndex,
                                      currentValue
                                    );
                                  }}
                                >
                                  {characteristic}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      char.name === characteristic
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              )
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Input
                    name={`models[${index}].characteristics[${charIndex}].value`}
                    placeholder="Значение характеристики"
                    value={char.value}
                    onChange={(e) =>
                      handleArrayChange(
                        "models",
                        index,
                        `characteristics[${charIndex}].value`,
                        e.target.value
                      )
                    }
                    required
                  />
                  <Button
                    type="button"
                    onClick={() => handleRemoveCharacteristic(index, charIndex)}
                  >
                    Удалить характеристику
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => handleAddCharacteristic(index)}
              >
                Добавить характеристику
              </Button>
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

        {/* Динамические поля для преимуществ */}
        <div className={STYLE}>
          <h3 className="font-semibold">Преимущества товара</h3>
          {formData.advantages.map((advantage, index) => (
            <div key={index} className="space-y-2 border p-4 rounded-lg">
              <Input
                name={`advantages[${index}].name`}
                placeholder={`Название преимущества #${index + 1}`}
                value={advantage.name}
                onChange={(e) =>
                  handleArrayChange("advantages", index, "name", e.target.value)
                }
                required
              />
              <Input
                name={`advantages[${index}].imageUrl`}
                placeholder={`Ссылка на изображение преимущества #${index + 1}`}
                value={advantage.imageUrl}
                onChange={(e) =>
                  handleArrayChange(
                    "advantages",
                    index,
                    "imageUrl",
                    e.target.value
                  )
                }
                required
              />
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
                required
              />
              <Button
                type="button"
                onClick={() => handleRemoveField("advantages", index)}
              >
                Удалить преимущество
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => handleAddField("advantages")}>
            Добавить преимущество
          </Button>
        </div>

        {/* Динамические поля для документов */}
        <div className={STYLE}>
          <h3 className="font-semibold">Документы товара</h3>
          {formData.documents.map((document, index) => (
            <div key={index} className="space-y-2 border p-4 rounded-lg">
              <Input
                name={`documents[${index}].name`}
                placeholder={`Название документа #${index + 1}`}
                value={document.name}
                onChange={(e) =>
                  handleArrayChange("documents", index, "name", e.target.value)
                }
                required
              />
              <Input
                name={`documents[${index}].url`}
                placeholder={`Ссылка на документ #${index + 1}`}
                value={document.url}
                onChange={(e) =>
                  handleArrayChange("documents", index, "url", e.target.value)
                }
                required
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

        {/* Динамические поля для функций (чекбоксы) */}
        <div className={STYLE}>
          <h3 className="font-semibold">Функции товара</h3>
          <div className="space-y-2">
            {functions.map((func) => (
              <label key={func.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={func.id}
                  checked={formData.functions.includes(func.id)}
                  onChange={() => handleFunctionSelect(func.id)}
                />
                <span>{func.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Динамические поля для спецификаций (чекбоксы) */}
        <div className={STYLE}>
          <h3 className="font-semibold">Спецификации товара</h3>
          <div className="space-y-2">
            {specificationsList.map((spec) => (
              <label key={spec.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={spec.id}
                  checked={formData.specifications.includes(spec.id)}
                  onChange={() => handleSpecificationSelect(spec.id)}
                />
                <span>{spec.name}</span>
              </label>
            ))}
          </div>
        </div>

        <Button variant={"secondary"} type="submit">
          Сохранить товар
        </Button>
      </form>
    </div>
  );
}
