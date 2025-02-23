import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "@/components/ui";
import { ProductFunctions, ProductFunctionsCategory } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  className?: string;
  productName: string;
  functions: ProductFunctions[];
  categoryFunctions: ProductFunctionsCategory[];
}

const Functions: React.FC<Props> = ({
  className,
  functions,
  categoryFunctions,
  productName,
}) => {
  return (
    <div className={cn(className, "")}>
      <Title
        size="h2"
        text={`Функциональные особенности серии ${productName}`}
        className="mb-6"
      />
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12">
        {categoryFunctions.map((categoryFunction) => (
          <div key={categoryFunction.id} className="w-full">
            <h3 className="font-bold mt-8 text-xl mb-4 tablet:mt-0">
              {categoryFunction.name}
            </h3>
            <Accordion type="single" collapsible>
              {functions
                .filter(
                  (functionality) =>
                    functionality.categoryId === categoryFunction.id
                )
                .map((functionality) => (
                  <AccordionItem
                    key={functionality.id}
                    value={`${functionality.id}`}
                  >
                    <AccordionTrigger className="font-semibold">
                      {functionality.name}
                    </AccordionTrigger>
                    <AccordionContent className="font-normal text-base">
                      {functionality.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Functions;
