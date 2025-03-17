import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "@/components/ui";
import { ProductFunctions } from "@prisma/client";
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
}

const Functions: React.FC<Props> = ({ className, functions, productName }) => {
  return (
    <div className={cn(className, "")}>
      <Title
        size="h2"
        text={`Функциональные особенности серии ${productName}`}
        className="mb-6"
      />
      <div>
        <Accordion
          className="grid grid-cols-1 tablet:grid-cols-2 gap-x-8"
          type="single"
          collapsible
        >
          {functions.map((functionality) => (
            <AccordionItem key={functionality.id} value={`${functionality.id}`}>
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
    </div>
  );
};

export default Functions;
