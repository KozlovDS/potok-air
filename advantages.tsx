import React from "react";
import { ProductAdvantages } from "@prisma/client";
import { Title } from "@/components/ui";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  className?: string;
  advantages: ProductAdvantages[];
  productName: string;
}

const ProductAdvantage: React.FC<Props> = ({
  className,
  advantages,
  productName,
}) => {
  return (
    <div className={cn(className, "")}>
      <Title size="h2" className="mb-4" text={`Преимущества ${productName}`} />
      {advantages.map((advantage, index) => (
        <div key={advantage.id} className="flex flex-wrap items-center mt-20">
          <div className="w-full tablet:w-1/2 px-4">
            <Image
              src={advantage.imageUrl}
              alt={advantage.name}
              width={600}
              height={400}
              className="w-full rounded-2xl"
            />
          </div>
          <div
            className={`w-full tablet:w-1/2 px-4 text-center tablet:text-left laptop:pl-12 ${
              index % 2 === 1 ? "tablet:order-first" : ""
            }`}
          >
            <h3 className="font-bold mt-8 text-xl tablet:mt-0 mobile:text-2xl">
              {advantage.name}
            </h3>
            <p className="mt-6 font-normal">{advantage.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAdvantage;
