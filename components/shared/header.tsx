"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Container } from "./container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { Navigation } from "../ui/navigate";
import { MobileMenu } from "./mobileMenu";
import { Phone } from "lucide-react";

interface Props {
  className?: string;
}

const MENU_LIST = [
  { name: "Главная", link: "/" },
  { name: "Каталог", link: "/catalog" },
  { name: "О нас", link: "/about" },
  { name: "Доставка", link: "/delivery" },
];

const CLASS_BURGER_LINE = "block absolute h-0.5 w-3.5 bg-secondary opacity-1 rotate-0 transition-all group-hover:bg-white";

export const Header: React.FC<Props> = ({ className }) => {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const toggleBurger = useCallback(() => {
    setBurgerOpen((prev) => !prev);
  }, []);

  return (
    <header className={cn("mobile:px-4", className)}>
      <Container className="flex gap-4 items-center justify-between bg-white rounded-b-[16px] shadow-header mb-14 px-4 py-3 mobile:rounded-full mobile:mt-4 mobile:px-6 tablet:px-8 tablet:py-4 laptop:py-6">
        <Link href="/" className="z-10 flex-grow tablet:flex-grow-0">
          Логотип
        </Link>
        <Navigation menuList={MENU_LIST} className="hidden tablet:flex" />
        <Button variant={"default"} size={isMobile ? "icon" : "default"}>
          {isMobile ? <Phone /> : "Заказать звонок"}
        </Button>

        <Button onClick={toggleBurger} variant={"icon"} size={"icon"} className="relative rotate-0 z-10 tablet:hidden" aria-expanded={burgerOpen} aria-label="Toggle menu">
          <span className={cn(CLASS_BURGER_LINE, "top-3.5", burgerOpen ? "top-6 w-0" : "")}></span>
          <span className={cn(CLASS_BURGER_LINE, "top-4.5", burgerOpen ? "rotate-45" : "")}></span>
          <span className={cn(CLASS_BURGER_LINE, "top-4.5", burgerOpen ? "-rotate-45" : "")}></span>
          <span className={cn(CLASS_BURGER_LINE, "top-6", burgerOpen ? "top-3 w-0 " : "")}></span>
        </Button>
      </Container>

      <MobileMenu isOpen={burgerOpen} onClose={() => setBurgerOpen(false)} menuList={MENU_LIST} />
    </header>
  );
};
