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
          <address className="not-italic text-right">
            <a
              href="tel:8(499)394-48-93"
              className="text-2xl block"
              aria-label="Позвонить нам"
            >
              8(499)394-48-93
            </a>
            <a
              href="tel:8(926)933-37-46"
              className="text-2xl block mb-2"
              aria-label="Позвонить нам"
            >
              8(926)933-37-46
            </a>
            <a
              href="mailto:potokair@yandex.ru"
              className="text-accent text-2xl mb-10"
              aria-label="Написать нам"
            >
              potokair@yandex.ru
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
