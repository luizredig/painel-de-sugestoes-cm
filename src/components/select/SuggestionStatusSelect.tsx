import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SuggestionStatus } from "@prisma/client";

const SuggestionStatusSelect = () => {
  const [statuses, setStatuses] = useState<SuggestionStatus[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const statusesResponse = await fetch(
          "http://localhost:3000/api/suggestion-status",
        );
        const fetchedStatuses = await statusesResponse.json();

        setStatuses(fetchedStatuses);
      } catch (error) {
        console.error("Error fetching suggestion statuses:", error);
      }
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
        {statuses.map((option) => (
          <SelectItem key={option.id} value={option.name}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SuggestionStatusSelect;
