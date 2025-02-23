// lib/types.ts

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
