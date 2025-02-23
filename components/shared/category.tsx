import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Title } from "../ui";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category as PrismaCategory } from "@prisma/client";
import { Api } from "@/services/api-client";
import { SkeletonSidebar } from "./skeletons/sidebar-skeleton";

interface Category extends PrismaCategory {
  subcategory?: { id: number; name: string; link: string }[];
}

interface Props {
  setOpen?: (isOpen: boolean) => void;
}

export const Category: React.FC<Props> = ({ setOpen = () => {} }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);
  const activeSubCategoryId = useCategoryStore(
    (state) => state.subCategoryActiveId
  );

  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const setActiveSubCategoryId = useCategoryStore(
    (state) => state.setSubCategoryActiveId
  );

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    Api.category.getAllWithSubCategories().then((data) => {
      setCategories(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonSidebar />
      ) : (
        <>
          <Title text="Категории" size="h3" className="mb-6" />
          <Accordion type="single" collapsible>
            <button
              className={cn(
                activeCategoryId === 0 && "text-accent",
                "border-b w-full text-left pb-4 hover:text-accent"
              )}
              onClick={() => {
                setActiveCategoryId(0);
              }}
            >
              Все
            </button>
            {categories.map((category) => (
              <AccordionItem value={category.name} key={category.id}>
                <AccordionTrigger
                  className={cn(
                    "uppercase text-sm",
                    activeCategoryId === category.id && "text-accent"
                  )}
                  onClick={() => {
                    setActiveCategoryId(category.id);
                  }}
                >
                  {category.name}
                </AccordionTrigger>
                <AccordionContent>
                  {category.subcategory && (
                    <ul
                      role="list"
                      className="space-y-4 pl-4 pb-4 pt-2 text-sm font-medium text-gray-900"
                    >
                      {category.subcategory.map((subCategory) => (
                        <li
                          key={subCategory.name}
                          className={cn(
                            "hover:text-accent",
                            activeSubCategoryId === subCategory.id &&
                              "text-accent"
                          )}
                          onClick={() => {
                            setActiveSubCategoryId(subCategory.id);
                            setOpen(false);
                          }}
                        >
                          <a href={`#category-${subCategory.id}`}>
                            {subCategory.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </>
  );
};
