"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  className?: string;
  menuList: { name: string; link: string }[];
}

export const Navigation: React.FC<Props> = ({ className, menuList }) => {
  const pathName = usePathname();

  return (
    <nav>
      <ul className={cn("flex gap-1 items-center", className)}>
        {menuList.map((item, index) => (
          <li key={index}>
            <Link
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full relative text-primary font-medium leading-6 transition-all after:content-[''] after:min-w-1.5 after:min-h-1.5 after:rounded-full  after:block after:bg-accent after:absolute after:right-4 after:opacity-0 after:transition-all after:opacity-1 hover:bg-background hover:text-accent",
                pathName === item.link
                  ? "bg-background text-accent pr-7 after:opacity-1 after:right-3"
                  : "after:opacity-0 after:right-3"
              )}
              href={item.link}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
