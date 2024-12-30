import { cn } from "@/lib/utils";
import { Container } from "./container";
import Link from "next/link";
import { Social } from "./social";
import { Button } from "../ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  menuList: Array<{ name: string; link: string }>;
}

export const MobileMenu: React.FC<Props> = ({ isOpen, onClose, menuList }) => (
  <Container className={cn("tablet:hidden flex-col px-3 pt-24 pb-10 fixed top-0 left-0 w-full h-full transition-transform translate-x-full bg-background-foreground", isOpen ? "flex translate-x-0" : "")}>
    <nav>
      <ul className="flex flex-col gap-5 pb-8 border-b border-[#ddd]">
        {menuList.map((item, index) => (
          <li key={index}>
            <Link href={item.link} className="text-2xl font-semibold" onClick={onClose}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    <a href="tel:+79999999999" className="text-lg mt-8">
      +7 (495) 132 - 05 -50
    </a>
    <a href="mailto:mail@shop.ru" className="text-lg mt-4 text-accent">
      mail@shop.ru
    </a>
    <Social className="mt-8" />
    <Button variant={"default"} className="mt-auto">
      Заказать звонок
    </Button>
  </Container>
);
