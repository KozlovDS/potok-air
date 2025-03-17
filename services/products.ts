import { axiosInstance } from "./instance";

export const getProducts = async (categoryId?: number) => {
  try {
    const { data } = await axiosInstance.get("/products", {
      params: { categoryId: categoryId || 0 },
    });
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getSliderProducts = async () => {
  try {
    const { data } = await axiosInstance.get("/products/slider");
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getSimilarProducts = async (subCategoryId?: number) => {
  try {
    const { data } = await axiosInstance.get("/products/similar", {
      params: { subCategoryId: subCategoryId },
    });
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (id: number) => {
  try {
    const { data } = await axiosInstance.get("/product", {
      params: { id: id },
    });
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
