import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link
      href="/"
      className={cn(className, "z-30 flex-grow tablet:flex-grow-0")}
    >
      <Image
        src={"/logo.svg"}
        alt={"Логотип компании"}
        width={150}
        height={47}
        className="h-auto"
        priority
      />
    </Link>
  );
};
