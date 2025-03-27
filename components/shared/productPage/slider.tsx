"use client";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { Thumbs, Navigation } from "swiper/modules";
import { ProductImages } from "@prisma/client";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  images: ProductImages[];
}

export const Slider: React.FC<Props> = ({ className, images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={cn(className, "min-w-0 select-none")}>
      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className="bg-white rounded-3xl mb-4"
      >
        {images &&
          images.map((image) => (
            <SwiperSlide
              key={image.id}
              className="justify-center items-center p-6"
              style={{ height: "auto", display: "flex" }}
            >
              <Image
                src={image.imageUrl}
                alt={""}
                width={900}
                height={400}
                className="w-auto h-auto max-h-[400px]"
                priority
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <Swiper
        modules={[Thumbs, Navigation]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        slidesPerView={3}
        spaceBetween={15}
        navigation
        breakpoints={{
          768: {
            slidesPerView: 4,
          },
          1440: {
            slidesPerView: 5,
          },
        }}
      >
        {images &&
          images.map((image) => (
            <SwiperSlide
              key={image.id}
              className="justify-center items-center bg-white rounded-2xl cursor-pointer p-2 hover:opacity-75"
              style={{ height: "auto", display: "flex" }}
            >
              <Image
                src={image.imageUrl}
                alt={""}
                width={145}
                height={112}
                className="w-auto h-auto max-h-28"
                priority
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
