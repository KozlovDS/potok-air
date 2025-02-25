import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <section className={cn("mx-auto max-w-[1776px]", className)}>
      {children}
    </section>
  );
};
