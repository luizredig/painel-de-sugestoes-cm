import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SuggestionStatus } from "@prisma/client";

type SuggestionStatusSelectProps = {
  disabled?: boolean;
  currentStatus?: string;
  onChange?: (value: string) => void;
};

const SuggestionStatusSelect = ({
  disabled = false,
  currentStatus = "",
  onChange,
}: SuggestionStatusSelectProps) => {
  const [statuses, setStatuses] = useState<SuggestionStatus[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>(currentStatus);

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

  useEffect(() => {
    setSelectedValue(currentStatus); // Sincroniza o valor selecionado com `currentStatus`
  }, [currentStatus]);

  const handleValueChange = (value: string) => {
    if (!disabled) {
      setSelectedValue(value);
      if (onChange) onChange(value); // Chama o callback para atualizar o pai
    }
  };

  const selectTriggerBgColor =
    selectedValue === "Pendente"
      ? "bg-yellow-400 text-yellow-50"
      : selectedValue === "Concluído"
        ? "bg-green-500 text-green-200"
        : "bg-background";

  return (
    <Select onValueChange={handleValueChange} disabled={disabled}>
      <SelectTrigger
        aria-label="Status"
        className={`${selectTriggerBgColor} h-fit w-24 px-2 py-1 text-[10px] focus:outline-none focus:ring-background ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={disabled}
      >
        <SelectValue placeholder={selectedValue || "Select Status"} />
      </SelectTrigger>

      {!disabled && (
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status.id} value={status.slug}>
              {status.name}
            </SelectItem>
          ))}
        </SelectContent>
      )}
    </Select>
  );
};

export default SuggestionStatusSelect;
