import clsx from "clsx";
import React from "react";

type TitleSize = "h5" | "h4" | "h3" | "h2" | "h1";

interface Props {
  size?: TitleSize;
  className?: string;
  text: string;
}

export const Title: React.FC<Props> = ({ text, size = "h2", className }) => {
  const mapTagBySize = {
    h5: "h5",
    h4: "h4",
    h3: "h3",
    h2: "h2",
    h1: "h1",
  } as const;

  const mapClassNameBySize = {
    h5: "text-[16px]",
    h4: "text-[22px]",
    h3: "text-[26px]",
    h2: "text-[24px] mobileSmall:text-[28px] mobile:text-[34px]",
    h1: "text-[32px] mobileSmall:text-[44px]  mobile:text-[52px] tablet:text-[68px] laptop:text-[90px]",
  } as const;

  return React.createElement(
    mapTagBySize[size],
    { className: clsx(mapClassNameBySize[size], className) },
    text
  );
};
