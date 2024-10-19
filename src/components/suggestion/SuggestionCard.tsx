import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { BuildingIcon } from "lucide-react";
import SuggestionStatusSelect from "@/components/select/SuggestionStatusSelect";
import { mock } from "../../../environment/mock";
import { Suggestion } from "@prisma/client";
import AgentMultiSelect from "../select/AgentMultiSelect";

type SuggestionCardProps = {
  suggestion: Suggestion;
};

const SuggestionCard = ({ suggestion }: SuggestionCardProps) => {
  const agents = mock.SuggestionsAgent;

  return (
    <Card className="flex h-52 w-96 gap-3 p-2 pr-5">
      <Badge className="p-1 hover:bg-primary"></Badge>

      <div className="flex h-full flex-col justify-between overflow-hidden py-4 pr-2">
        <div className="flex">
          <div className="flex w-3/4 flex-col">
            <Tooltip>
              <TooltipTrigger className="flex cursor-default border-none bg-transparent">
                <span className="select-none truncate pb-2 text-xl font-bold text-muted-foreground">
                  {suggestion.title}
                </span>
              </TooltipTrigger>
              <TooltipContent>{suggestion.title}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className="flex cursor-default border-none bg-transparent">
                <span
                  className="text-md select-none overflow-hidden pb-2 text-left text-muted-foreground"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {suggestion.description}
                </span>
              </TooltipTrigger>
              <TooltipContent>{suggestion.description}</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex w-1/4 justify-end">
            <SuggestionStatusSelect />
          </div>
        </div>

        <div className="flex w-full items-center gap-2">
          <div className="flex w-full items-center justify-end gap-2">
            <div className="flex w-1/3 gap-1">
              <div className="flex items-center">
                <BuildingIcon size={16} />
              </div>

              <div className="flex overflow-hidden">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="select-none truncate text-[10px]">
                      {suggestion.companyId}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>{suggestion.companyId}</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="flex w-1/4">
              <AgentMultiSelect agents={agents} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SuggestionCard;
