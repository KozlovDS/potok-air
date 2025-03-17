"use client";

import { ProductGroupList, Sidebar, Category } from "@/components/shared";
import { SkeletonProductCard } from "@/components/shared/skeletons/product-group-skeleton";
import { Button, Container, Title } from "@/components/ui";
import { Product } from "@/lib/types";
import { Api } from "@/services/api-client";
import { useCategoryStore } from "@/store/category";
import { SubCategory } from "@prisma/client";
import { Filter } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

const Popup = dynamic(() => import("@/components/shared/popup"), {
  ssr: false,
});

type SubCategoryWithProducts = SubCategory & {
  products: Product[];
};

export default function Catalog() {
  const [products, setProducts] = React.useState<SubCategoryWithProducts[]>([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(true);

  const activeCategoryId = useCategoryStore((state) => state.activeId);

  React.useEffect(() => {
    Api.products.getProducts(activeCategoryId).then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, [activeCategoryId]);

  return (
    <Container className="grid grid-cols-2">
      <Title text="Каталог" size="h1" />
      <Button
        variant={"secondary"}
        className="flex gap-2 sticky top-4 z-10 w-max h-max self-center justify-self-end tablet:hidden"
        onClick={() => setMobileSidebarOpen(true)}
      >
        <Filter />
        Фильтры
      </Button>
      <Popup isOpen={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <Category setOpen={setMobileSidebarOpen} />
        {/* <Filters /> */}
      </Popup>
      <div
        aria-labelledby="products-heading"
        className="pb-24 pt-6 grid grid-cols-1 col-span-2 gap-x-8 gap-y-10 
          tablet:grid-cols-[minmax(280px,_1fr)_repeat(3,_1fr)]
          laptop:gap-x-10"
      >
        {/* Filters */}
        <Sidebar />
        {/* Product grid */}
        <div className="tablet:col-span-3">
          {isLoading ? (
            <SkeletonProductCard />
          ) : (
            products.map(
              (product) =>
                product.products.length > 0 && (
                  <ProductGroupList
                    key={product.id}
                    title={product.name}
                    products={product.products}
                    categoryId={product.id}
                    className="mb-10"
                  />
                )
            )
          )}
        </div>
      </div>
    </Container>
  );
}
