"use client";

import {
  ProductAdvantages,
  ProductCharacteristics,
  ProductDocuments,
  ProductFunctions,
  Products,
  ProductSpecification,
} from "@prisma/client";
import { notFound } from "next/navigation";
import { Button, Container } from "@/components/ui";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { Api } from "@/services/api-client";
import dynamic from "next/dynamic";
import { useProductStore } from "@/store/product";
import {
  Slider,
  ProductModels,
  ProductDescription,
} from "@/components/shared/productPage";
import { ProductGroupList } from "@/components/shared";
import { RequestForm } from "@/components/shared/productPage/requestForm";
import { Product } from "@/lib/types";

const Popup = dynamic(() => import("@/components/shared/popup"), {
  ssr: false,
});

const ProductDocument = dynamic(
  () => import("@/components/shared/productPage/document")
);

const ProductAdvantage = dynamic(
  () => import("@/components/shared/productPage/advantages")
);

const Video = dynamic(() => import("@/components/shared/productPage/video"));
const Functions = dynamic(
  () => import("@/components/shared/productPage/functions")
);

interface ProductItem extends Products {
  images: { id: number; imageUrl: string; productId: number }[];
  models: {
    id: number;
    name: string;
    price: number;
    characteristics: ProductCharacteristics[];
  }[];
  specification: ProductSpecification[];
  documents: ProductDocuments[];
  advantages: ProductAdvantages[];
  functions: ProductFunctions[];
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = React.use(params);

  const [product, setProduct] = React.useState<ProductItem | null>(null);
  const [similarProducts, setSimilarProducts] = React.useState<
    Product[] | null
  >(null);
  const [isLoading, setIsLoading] = React.useState(true); // Add loading state
  const price = useProductStore((state) => state.price);
  const activeModelId = useProductStore().activeModelId;
  const [requestOpen, setRequestOpen] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true); // Set loading to true before fetching
    Api.products
      .getProduct(id)
      .then((product) => {
        setProduct(product);
        setIsLoading(false); // Set loading to false after successful fetch
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setIsLoading(false); // Set loading to false even on error
      });
  }, [id]);

  React.useEffect(() => {
    if (product) {
      Api.products.getSimilarProducts(product.subCategoryId).then((data) => {
        setSimilarProducts(
          data.filter((item: Products) => item.id !== product.id)
        );
      });
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-transparent"></div>
    ); // Display loading message
  }

  if (!product) {
    return notFound();
  }

  return (
    product && (
      <>
        <Container className="grid grid-cols-1 gap-10 min-w-0 mb-12 tablet:grid-cols-2">
          <Slider images={product.images} className="h-full" />

          <div className="w-full">
            <h1 className="text-4xl mb-6">{product.name}</h1>
            <b className="text-2xl mb-4 block">
              {price.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}{" "}
            </b>
            <ProductModels models={product.models} className="mb-4" />
            <Button variant={"secondary"} onClick={() => setRequestOpen(true)}>
              Заявка на расчет
            </Button>
            <Popup
              isOpen={requestOpen}
              onOpenChange={setRequestOpen}
              title="Заявка на расчет"
              className="mobile:p-16 mobile:w-[600]"
            >
              <RequestForm
                productName={product.name}
                productModel={
                  product.models.find((model) => model.id === activeModelId)
                    ?.name || ""
                }
              />
            </Popup>
          </div>
        </Container>
        <Container>
          <Tabs
            defaultValue="description"
            className="w-full bg-white rounded-3xl p-4 mb-16"
          >
            <TabsList className="gap-x-4 gap-y-2 mb-4 sticky z-10 top-4 bg-background rounded-md px-4 py-2 flex-wrap">
              {product.description && (
                <TabsTrigger value="description" className=" mobile:text-base">
                  Описание товара
                </TabsTrigger>
              )}
              {product.documents.length > 0 && (
                <TabsTrigger value="documents" className=" mobile:text-base">
                  Документы
                </TabsTrigger>
              )}
              {product.advantages.length > 0 && (
                <TabsTrigger value="advantages" className=" mobile:text-base">
                  Преимущества
                </TabsTrigger>
              )}
              {product.videoLink && (
                <TabsTrigger value="video" className=" mobile:text-base">
                  Видеообзор
                </TabsTrigger>
              )}
              {product.functions.length > 0 && (
                <TabsTrigger value="functions" className=" mobile:text-base">
                  Функции
                </TabsTrigger>
              )}
            </TabsList>
            {product.description && (
              <TabsContent value="description">
                <ProductDescription
                  description={product.description}
                  name={product.name}
                  specifications={product.specification}
                />
              </TabsContent>
            )}
            {product.documents && (
              <TabsContent value="documents">
                <ProductDocument documents={product.documents} />
              </TabsContent>
            )}
            {product.advantages && (
              <TabsContent value="advantages">
                <ProductAdvantage
                  advantages={product.advantages}
                  productName={product.name}
                />
              </TabsContent>
            )}
            {product.videoLink && (
              <TabsContent value="video">
                <Video videoLink={product.videoLink} />
              </TabsContent>
            )}
            {product.functions && (
              <TabsContent value="functions">
                <Functions
                  productName={product.name}
                  functions={product.functions}
                />
              </TabsContent>
            )}
          </Tabs>
          {similarProducts && (
            <ProductGroupList
              className="mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4"
              title={"Похожие системы"}
              products={similarProducts}
              categoryId={0}
            />
          )}
        </Container>
      </>
    )
  );
}
