"use client";

import React from "react";
import { ProductCard } from "./product-card";
import { Title } from "../ui/title";
import { Products } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/store/category";

interface ProductGroupList {
  title: string;
  products: Products[];
  categoryId: number;
  className?: string;
}

export const ProductGroupList: React.FC<ProductGroupList> = ({
  title,
  products,
  className,
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
      setActiveSubCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, categoryId, setActiveSubCategoryId]);

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
            imageUrl={product.imageUrl}
            subCategoryId={product.subCategoryId}
            description={""}
            videoLink={null}
          />
        ))}
      </div>
    </div>
  );
};
