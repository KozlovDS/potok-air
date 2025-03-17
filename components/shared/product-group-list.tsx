"use client";

import React from "react";
import { ProductCard } from "./product-card";
import { Title } from "../ui/title";

import { cn } from "@/lib/utils";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/store/category";
import { Product } from "@/lib/types";
import { SkeletonProductCard } from "./skeletons/product-group-skeleton";

interface ProductGroupList {
  title: string;
  products: Product[];
  categoryId?: number;
  isLoading?: boolean;
  className?: string;
}

export const ProductGroupList: React.FC<ProductGroupList> = ({
  title,
  products,
  className,
  isLoading = false,
  categoryId,
}) => {
  const setActiveSubCategoryId = useCategoryStore(
    (state) => state.setSubCategoryActiveId
  );
  const intersectionRef = React.useRef<HTMLDivElement>(null!);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      if (categoryId !== undefined) {
        setActiveSubCategoryId(categoryId);
      }
    }
  }, [intersection?.isIntersecting, categoryId, setActiveSubCategoryId]);

  if (isLoading) {
    return <SkeletonProductCard />;
  }

  return (
    <div
      className="mx-auto"
      id={`category-${categoryId}`}
      ref={intersectionRef}
    >
      <Title text={title} size="h2" className="mb-6" />
      <div
        className={cn(
          "grid grid-cols-1 gap-x-6 gap-y-10 tablet:grid-cols-2 tablet:gap-x-8 laptop:grid-cols-3",
          className
        )}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            images={product.images}
          />
        ))}
      </div>
    </div>
  );
};
