import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  title: string;
  content: string;
}

export const ContactsInfo: React.FC<Props> = ({
  className,
  title,
  content,
}) => {
  return (
    <div className={cn(className, "flex flex-col gap-2")}>
      <span className="text-secondary">{title}</span>
      <div className="text-lg">
        {content.split(",").map((item, index) => (
          <span key={index}>
            {item}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
};
