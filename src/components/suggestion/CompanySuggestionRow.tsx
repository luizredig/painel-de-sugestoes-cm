import { Separator } from "@/components/ui/separator";
import { BuildingIcon } from "lucide-react";
import SuggestionCard from "./SuggestionCard";
import { Company, Suggestion } from "@prisma/client";

type CompanySuggestionRowProps = {
  company: Company;
  suggestions: Suggestion[];
};

const CompanySuggestionRow = ({
  company,
  suggestions,
}: CompanySuggestionRowProps) => {
  return (
    <div className="flex flex-col gap-4 py-5">
      <div className="flex w-fit flex-col gap-4 px-5">
        <div className="flex items-center gap-2">
          <BuildingIcon className="h-8 w-8 text-primary" />

          <span className="select-none text-3xl font-semibold">
            {company.name}
          </span>
        </div>

        <Separator />
      </div>

      <div className="flex flex-1 gap-10 overflow-x-scroll px-5">
        {suggestions.map((suggestion: Suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    </div>
  );
};

export default CompanySuggestionRow;
