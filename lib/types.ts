export interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

export interface Filter {
  id: string;
  name: string;
  options: FilterOption[];
}

export interface ProductFunctions {
  id: number;
  name: string;
  description: string;
}

export interface SubCategory {
  id: number;
  name: string;
}

export interface Images {
  imageUrl: string;
}

export interface Characteristic {
  name: string;
  value: string;
}

export interface Models {
  name: string;
  price: string;
  characteristics: Characteristic[];
}

export interface Advantages {
  name: string;
  imageUrl: string;
  description: string;
}

export interface Documents {
  name: string;
  url: string;
}

export interface Specification {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  videoLink?: string;
  slider?: boolean;
  subCategoryId?: number | null;
  images: Images[];
  models?: Models[];
  advantages?: Advantages[];
  documents?: Documents[];
  functions?: number[];
  specifications?: number[];
}
