import { cn } from "@/lib/utils";
import Link from "next/link";
import { SocialLinks } from "./social-links";
import { Button } from "../ui";

interface Props {
  menuList: Array<{ name: string; link: string }>;
  onClose: (isOpen: boolean) => void;
}

export const MobileMenu: React.FC<Props> = ({ menuList, onClose }) => (
  <div className={cn("flex flex-col h-full")}>
    <nav>
      <ul className="flex flex-col gap-5 pb-8 border-b border-[#ddd]">
        {menuList.map((item, index) => (
          <li key={index}>
            <Link
              href={item.link}
              className="text-2xl font-semibold"
              onClick={() => onClose(false)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    <div className="flex flex-col">
      <a href="tel:+79999999999" className="text-lg mt-8">
        +7 (495) 132 - 05 -50
      </a>
      <a href="mailto:mail@shop.ru" className="text-lg mt-4 mb-8 text-accent">
        mail@shop.ru
      </a>
    </div>
    <SocialLinks className="flex-grow mb-8" />
    <Button variant={"default"} className="block max-h-10">
      Заказать звонок
    </Button>
  </div>
);
