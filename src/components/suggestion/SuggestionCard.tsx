import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { BuildingIcon } from "lucide-react";
import SuggestionStatusSelect from "@/components/select/SuggestionStatusSelect";
import { Suggestion } from "@prisma/client";
import SuggestionDetails from "./SuggestionDetails";

type SuggestionCardProps = {
  suggestion: Suggestion;
};

const SuggestionCard = ({ suggestion }: SuggestionCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        className="flex h-52 w-96 cursor-pointer gap-3 p-2 pr-5"
        onClick={() => setIsModalOpen(true)}
      >
        <Badge className="p-1 hover:bg-primary"></Badge>

        <div className="flex h-full flex-col justify-between overflow-hidden py-4 pr-2">
          <div className="flex">
            <div className="flex w-3/4 flex-col">
              <Tooltip>
                <TooltipTrigger className="flex cursor-default border-none bg-transparent">
                  <span className="text-xla select-none truncate pb-2 font-bold text-muted-foreground">
                    {suggestion.title}
                  </span>
                </TooltipTrigger>
                <TooltipContent>{suggestion.title}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className="flex overflow-y-hidden border-none">
                  <span
                    className="text-md select-none text-left text-muted-foreground"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: "1.2",
                      maxHeight: "3.6em",
                    }}
                  >
                    {suggestion.description}
                  </span>
                </TooltipTrigger>
                <TooltipContent>{suggestion.description}</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex w-1/4 flex-col">
              <span className="text-[10px] font-bold text-muted-foreground">
                Status:
              </span>

              <div className="flex" onClick={(e) => e.stopPropagation()}>
                <SuggestionStatusSelect />
              </div>
            </div>
          </div>

          <div className="flex w-full gap-2">
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

              <div
                className="flex w-1/4 flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[10px] font-bold text-muted-foreground">
                  Responsáveis:
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {isModalOpen && (
        <SuggestionDetails
          suggestionId={suggestion.id}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default SuggestionCard;
