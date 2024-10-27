import { Separator } from "@/components/ui/separator";
import { BuildingIcon } from "lucide-react";
import SuggestionCard from "./SuggestionCard";
import {
  Company,
  Suggestion,
  SuggestionsAgent,
  SuggestionStatus,
} from "@prisma/client";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type CompanySuggestionRowProps = {
  company: Company;
  suggestions: (Suggestion & {
    company: Company;
    status: SuggestionStatus;
    agents: SuggestionsAgent[];
  })[];
};

const CompanySuggestionRow = ({
  company,
  suggestions,
}: CompanySuggestionRowProps) => {
  return (
    <div className="flex flex-col py-5">
      <div className="flex w-fit flex-col gap-4 px-5">
        <div className="flex items-center gap-2">
          <BuildingIcon className="h-8 w-8 text-primary" />

          <span className="select-none text-3xl font-semibold">
            {company.name}
          </span>
        </div>

        <Separator />
      </div>

      <ScrollArea className="flex flex-col py-4">
        <div className="flex gap-10 px-5">
          {suggestions.map((suggestion) => (
            <SuggestionCard key={suggestion.id} suggestion={suggestion} />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CompanySuggestionRow;
