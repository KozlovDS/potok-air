"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button, Container, Logo, Navigation } from "../ui";
import { MobileMenu } from "./mobile-menu";
import { Phone } from "lucide-react";
import { MENU_LIST } from "@/lib/mockdate";
import dynamic from "next/dynamic";

const Popup = dynamic(() => import("@/components/shared/popup"), {
  ssr: false,
});

interface Props {
  className?: string;
}

const CLASS_BURGER_LINE =
  "block absolute h-0.5 w-3.5 bg-secondary opacity-1 rotate-0 transition-all group-hover:bg-white";

export const Header: React.FC<Props> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 400); // Установите порог для мобильных устройств
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Проверяем размер при первом рендере

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={cn("mobile:px-4", className)}>
      <Container className="flex gap-4 items-center justify-between bg-white rounded-b-[16px] shadow-header mb-6 mobile:mb-8 tablet:mb-10 laptop:mb-14 px-4 py-3 mobile:rounded-full mobile:mt-4 mobile:px-6 tablet:px-8 tablet:py-4 laptop:py-5">
        <Logo />
        <Navigation menuList={MENU_LIST} className="hidden tablet:flex" />
        <Button variant={"default"} size={isMobile ? "icon" : "default"}>
          {isMobile ? <Phone /> : "Заказать звонок"}
        </Button>

        <Button
          onClick={() => setOpen(true)}
          variant={"icon"}
          size={"icon"}
          className="relative rotate-0 z-30 tablet:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              CLASS_BURGER_LINE,
              "top-3.5",
              isOpen ? "top-6 w-0" : ""
            )}
          ></span>
          <span
            className={cn(
              CLASS_BURGER_LINE,
              "top-4.5",
              isOpen ? "rotate-45" : ""
            )}
          ></span>
          <span
            className={cn(
              CLASS_BURGER_LINE,
              "top-4.5",
              isOpen ? "-rotate-45" : ""
            )}
          ></span>
          <span
            className={cn(
              CLASS_BURGER_LINE,
              "top-6",
              isOpen ? "top-3 w-0 " : ""
            )}
          ></span>
        </Button>
      </Container>

      <Popup isOpen={isOpen} onOpenChange={setOpen}>
        <MobileMenu onClose={setOpen} menuList={MENU_LIST} />
      </Popup>
    </header>
  );
};
