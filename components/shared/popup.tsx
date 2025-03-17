import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMedia } from "react-use";

interface Props {
  children: React.ReactNode;
  title?: string;
  className?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const Popup: React.FC<Props> = ({
  children,
  title,
  isOpen,
  onOpenChange,
  className,
}) => {
  const isDesktop = useMedia("(min-width: 768px)");
  const drawerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const focusableElement = drawerRef.current?.querySelector(
          "button, a, input, [tabindex]:not([tabindex='-1'])"
        ) as HTMLElement | null;

        focusableElement?.focus();
      }, 10); // Даем время на рендер
    }
  }, [isOpen]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onOpenChange}
      direction={isDesktop ? "right" : "bottom"}
    >
      <DrawerContent
        ref={drawerRef}
        aria-describedby={undefined}
        className={cn(
          isDesktop
            ? " min-w-80 max-w-[600px] top-0 left-auto right-0 mt-0 flex p-4 overflow-y-auto overflow-x-hidden"
            : "p-4 mobileSmall:p-8",
          className
        )}
      >
        {!isDesktop && (
          <div className="mx-auto mb-4 h-2 w-[100px] rounded-full bg-secondary" />
        )}
        <DrawerHeader className="items-center mb-8 justify-between">
          <DrawerTitle className="text-2xl">{title}</DrawerTitle>
          {isDesktop && (
            <DrawerClose asChild className="justify-self-end">
              <Button variant={"icon"} size={"icon"}>
                <X />
              </Button>
            </DrawerClose>
          )}
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default Popup;
