import React from "react";
import { Title } from "@/components/ui";
import Image from "next/image";
import { ProductSpecification } from "@prisma/client";

interface Props {
  description: string;
  name: string;
  specifications: ProductSpecification[];
}

export const ProductDescription: React.FC<Props> = ({
  description,
  name,
  specifications,
}) => {
  return (
    <>
      <Title size="h2" className="mb-4" text={name} />
      <p className="font-normal mb-10">{description}</p>
      <ul className="flex flex-wrap items-center justify-center gap-10">
        {specifications.map((specification) => (
          <li
            key={specification.id}
            className="flex flex-col items-center gap-4 max-w-60 text-center"
          >
            <div className="relative w-full h-14">
              <Image
                src={`/advantages/${specification.imageUrl}`}
                alt={specification.name}
                fill
                sizes="100%"
                style={{ objectFit: "contain" }}
              />
            </div>
            {specification.name}
          </li>
        ))}
      </ul>
    </>
  );
};
