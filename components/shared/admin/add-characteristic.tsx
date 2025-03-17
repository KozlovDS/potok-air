import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Popup from "../popup";
import { Button, Input } from "@/components/ui";

interface Props {
  className?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  setCharacteristics: (characteristics: string[]) => void;
  characteristics: string[];
}

export const AddCharacteristic: React.FC<Props> = ({
  className,
  isOpen,
  onOpenChange,
  setCharacteristics,
  characteristics,
}) => {
  const [newCharacteristic, setNewCharacteristic] = useState("");

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCharacteristics([...characteristics, newCharacteristic]);
    setNewCharacteristic("");
    onOpenChange(false);
  };

  return (
    <Popup
      className={cn(className)}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Новая характеристика"
    >
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
        <Input
          name="name"
          placeholder="Название характеристики"
          required
          value={newCharacteristic}
          onChange={(e) => setNewCharacteristic(e.target.value)}
        />
        <Button variant={"secondary"} type="submit">
          Сохранить характеристику
        </Button>
      </form>
    </Popup>
  );
};
