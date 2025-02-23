import { cn } from "@/lib/utils";
import React from "react";
import { Container, Logo, Navigation } from "../ui";
import { MENU_LIST } from "@/lib/mockdate";
import { SocialLinks } from "./social-links";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn(className, "px-4 mt-20 bg-white py-10 rounded-t-lg")}>
      <Container className="flex flex-wrap justify-between gap-10">
        <Logo />
        <Navigation
          menuList={MENU_LIST}
          className="flex-col items-start text-lg"
        />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 max-w-96">
            <span className="text-secondary">Адрес</span>
            <div className="text-lg">
              Московская область, Солнечногорский район, дер.Безверхово, д.13
            </div>
          </div>
          <div className="flex flex-col gap-2 max-w-60">
            <span className="text-secondary">Режим работы</span>
            <div className="text-lg">
              Пн - Пт: 9:00 - 21:00
              <br /> Сб - Вс: 10:00 - 19:00
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-end">
          <address className="not-italic">
            <a
              href="tel:+79999999999"
              className="text-3xl"
              aria-label="Позвонить нам"
            >
              +7 (999) 999-99-99
            </a>
            <br />
            <a
              href="mailto:mail@shop.ru"
              className="text-accent text-3xl mb-10"
              aria-label="Написать нам"
            >
              mail@shop.ru
            </a>
          </address>
          <SocialLinks />
        </div>
      </Container>
      <hr className="my-10" />
      <Container className="text-secondary flex flex-wrap justify-between text-lg font-medium text-center">
        <span>&copy; {new Date().getFullYear()} Все права защищены</span>
        <span>ООО &quot;ПОТОК&quot; ИНН: 5044099282 | ОГРН: 1165044052612</span>
        <Link href="/privacy-policy" className="hover:text-accent">
          Политика конфиденциальности
        </Link>
      </Container>
    </footer>
  );
};
