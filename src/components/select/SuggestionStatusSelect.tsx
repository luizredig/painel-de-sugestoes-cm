import { useState, useEffect } from "react";
import { SuggestionStatus } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { prismaClient } from "@/lib/prisma";

const SuggestionStatusSelect = () => {
  const [options, setOptions] = useState<SuggestionStatus[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    const fetchStatuses = async () => {
      const statuses = await prismaClient.suggestionStatus.findMany();
      setOptions(statuses);
    };
    fetchStatuses();
  }, []);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const selectTriggerBgColor =
    selectedValue === "Pendente"
      ? "bg-yellow-400 text-yellow-50"
      : selectedValue === "Concluído"
        ? "bg-green-500 text-green-200"
        : "bg-background";

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger
        aria-label="Status"
        className={`${selectTriggerBgColor} h-fit w-24 px-2 py-1 text-[10px] focus:outline-none focus:ring-background`}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.name}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SuggestionStatusSelect;
