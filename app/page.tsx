"use client";

import { ProductGroupList } from "@/components/shared";
import { HomeHeroSlider } from "@/components/shared/home-hero-slider";
import { Container } from "@/components/ui";
import { Product } from "@/lib/types";
import { Api } from "@/services/api-client";

import React from "react";

export default function Home() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    Api.products.getSliderProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Container className="mb-14">
        <HomeHeroSlider products={products} isLoading={isLoading} />
      </Container>
      <Container>
        <ProductGroupList
          title={"Популярные товары"}
          products={products}
          isLoading={isLoading}
        />
      </Container>
    </>
  );
}
