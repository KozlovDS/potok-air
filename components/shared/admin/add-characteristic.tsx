// add-characteristic.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Characteristic {
  id: number;
  name: string;
  order_number: number;
}

interface AddCharacteristicProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setCharacteristics: (chars: Characteristic[]) => void;
  characteristics: Characteristic[];
}

export function AddCharacteristic({
  isOpen,
  onOpenChange,
  setCharacteristics,
  characteristics,
}: AddCharacteristicProps) {
  const [newCharName, setNewCharName] = useState("");
  const [afterCharId, setAfterCharId] = useState<number | null>(null);

  const handleAdd = async () => {
    if (!newCharName) return;

    const response = await fetch("/api/characteristics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCharName, afterId: afterCharId }),
    });

    if (response.ok) {
      const newChar = await response.json(); // Ожидаем объект {id, name, order_number}
      const updatedCharacteristics = [...characteristics];
      if (afterCharId) {
        const index = updatedCharacteristics.findIndex(
          (char) => char.id === afterCharId
        );
        updatedCharacteristics.splice(index + 1, 0, newChar);
      } else {
        updatedCharacteristics.push(newChar);
      }
      setCharacteristics(updatedCharacteristics);
      setNewCharName("");
      setAfterCharId(null);
      onOpenChange(false);
    } else {
      console.error("Ошибка добавления характеристики:", response.statusText);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить характеристику</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Название характеристики"
            value={newCharName}
            onChange={(e) => setNewCharName(e.target.value)}
          />
          <div>
            <label>После какой характеристики добавить:</label>
            <select
              value={afterCharId || ""}
              onChange={(e) =>
                setAfterCharId(e.target.value ? Number(e.target.value) : null)
              }
              className="w-full p-2 border rounded"
            >
              <option value="">В конец</option>
              {characteristics.map((char) => (
                <option key={char.id} value={char.id}>
                  {char.name}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={handleAdd}>Добавить</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
