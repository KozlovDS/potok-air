import { cn } from "@/lib/utils";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Button } from "@/components/ui";
import Link from "next/link";
import { Product } from "@/lib/types";
import { SkeletonHeroSlider } from "./skeletons/hero-slider-skeleton";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  className?: string;
  isLoading?: boolean;
  products: Product[];
}

export const HomeHeroSlider: React.FC<Props> = ({
  className,
  products,
  isLoading = false,
}) => {
  if (isLoading) {
    return <SkeletonHeroSlider />;
  }

  return (
    <>
      <Swiper
        className={cn(
          className,
          "relative w-full bg-accent rounded-lg text-white"
        )}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true, el: ".custom-pagination" }} // Включаем пагинацию и делаем ее кликабельной
        onSlideChange={(swiper) => {
          document.documentElement.style.setProperty(
            "--active-bullet-index",
            swiper.realIndex.toString()
          );
        }}
        loop
        autoplay={{ delay: 8000 }}
      >
        {products &&
          products.map((product) => (
            <SwiperSlide
              key={product.id}
              className="p-12 flex flex-col gap-8 mobile:flex-row justify-between items-center"
            >
              <div className="mobile:w-1/2 mb-10 mobile:mb-0">
                <h2 className="text-4xl font-bold leading-tight mb-4">
                  {product.name}
                </h2>
                <p className="text-xl mb-4">
                  {product.description ? product.description.slice(0, 135) : ""}
                  ...
                </p>
                <Link href={`/product/${product.id}`}>
                  <Button variant={"outline"} className="text-primary">
                    Подробнее
                  </Button>
                </Link>
              </div>
              <div className="mobile:w-1/2">
                <Image
                  src={product.images[0].imageUrl}
                  alt={product.name}
                  className="w-full rounded-xl"
                  priority
                  width={850}
                  height={300}
                />
              </div>
            </SwiperSlide>
          ))}
        <div className="custom-pagination absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 z-10"></div>
      </Swiper>

      <style>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 9999px;
          transition: all 0.3s ease;
        }
        
        .custom-pagination .swiper-pagination-bullet-active {
          width: 40px;
          height: 8px;
          background: white;
        }
      `}</style>
    </>
  );
};
