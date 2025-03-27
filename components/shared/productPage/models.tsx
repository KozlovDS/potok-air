"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, Title } from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";
import { useProductStore } from "@/store/product";
import dynamic from "next/dynamic";

const Popup = dynamic(() => import("@/components/shared/popup"));

interface Props {
  className?: string;
  models: {
    id: number;
    name: string;
    price: number;
    characteristics: { id: number; name: string; value: string }[];
  }[];
}

export const ProductModels: React.FC<Props> = ({ className, models }) => {
  const price = useProductStore((state) => state.setPrice);
  const setActiveModelId = useProductStore((state) => state.setActiveModelId);
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    price(models[0].price);
  }, [models, price]);

  return (
    <Tabs
      defaultValue={`${models[0].id}`}
      className={cn(className, "w-full bg-white rounded-3xl p-4")}
    >
      <Title text="Модели" size="h3" className="mb-4" />
      <TabsList className="gap-4 mb-4 flex-wrap">
        {models.map((model) => (
          <TabsTrigger
            key={model.id}
            value={`${model.id}`}
            className="text-left"
            onClick={() => {
              price(model.price);
              setActiveModelId(model.id);
            }}
          >
            {model.name.split(" ").map((word, index) => (
              <React.Fragment key={index}>
                {word}
                <br />
              </React.Fragment>
            ))}
          </TabsTrigger>
        ))}
      </TabsList>
      {models.map((model) => (
        <TabsContent key={model.id} value={`${model.id}`}>
          <Table>
            <TableCaption>
              <Button
                onClick={() => setOpen(true)}
                variant={"link"}
                size={"link"}
              >
                Подробнее
              </Button>
              <Popup isOpen={isOpen} onOpenChange={setOpen} title={model.name}>
                <ul className="flex flex-col mt-4">
                  {model.characteristics.map((characteristics) => (
                    <li
                      key={characteristics.id}
                      className="flex justify-between gap-6 border-b last:border-none border-gray-200 py-6 hover:bg-background"
                    >
                      <span className="font-medium">
                        {characteristics.name}
                      </span>
                      <span>{characteristics.value}</span>
                    </li>
                  ))}
                </ul>
              </Popup>
            </TableCaption>
            <TableBody>
              {model.characteristics.slice(0, 5).map((characteristics) => (
                <TableRow key={characteristics.id}>
                  <TableCell className="font-medium">
                    {characteristics.name}
                  </TableCell>
                  <TableCell>{characteristics.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      ))}
    </Tabs>
  );
};
