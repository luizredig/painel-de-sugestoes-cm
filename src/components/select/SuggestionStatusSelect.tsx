import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { mock } from "../../../environment/mock";
import { useState } from "react";

const SuggestionStatusSelect = () => {
  const options = mock.SuggestionStatus;
  const [selectedValue, setSelectedValue] = useState<string>("");

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
