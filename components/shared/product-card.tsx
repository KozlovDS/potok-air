import React from "react";
import Image from "next/image";

import Link from "next/link";
import { Product } from "@/lib/types";

export const ProductCard: React.FC<Product> = ({ id, images, name }) => {
  return (
    <Link
      key={id}
      href={`/product/${id}`}
      className="group flex flex-col bg-white rounded-xl p-4 mobile:p-6"
    >
      <div className="grow flex items-center">
        <Image
          alt={name}
          src={images[0].imageUrl}
          width={400}
          height={100}
          priority={true}
          className="w-full h-auto group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900"></p>
    </Link>
  );
};
