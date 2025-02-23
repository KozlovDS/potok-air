import { Category, SubCategory } from "@prisma/client";
import { axiosInstance } from "./instance";

interface CategoryWithSubCategories extends Category {
  subCategories: SubCategory[];
}

export const getAllWithSubCategories = async () => {
  const { data } = await axiosInstance.get<CategoryWithSubCategories[]>("/category-with-subcategories");
  return data;
};
