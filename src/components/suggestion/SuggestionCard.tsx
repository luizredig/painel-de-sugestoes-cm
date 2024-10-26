import SuggestionStatusSelect from "@/components/select/SuggestionStatusSelect";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Company,
  Suggestion,
  SuggestionsAgent,
  SuggestionStatus,
} from "@prisma/client";
import { BuildingIcon } from "lucide-react";
import { useEffect, useState } from "react";
import SuggestionDetails from "./SuggestionDetails";
import AgentMultiSelect from "../select/AgentMultiSelect";
import { Skeleton } from "../ui/skeleton";

type SuggestionCardProps = {
  suggestion: Suggestion & {
    company: Company;
    status: SuggestionStatus;
    agents: SuggestionsAgent[];
  };
};

const SuggestionCard = ({ suggestion }: SuggestionCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyResponse = await fetch(
          `http://localhost:3000/api/companies/${suggestion.companyId}`,
        );
        const { name } = await companyResponse.json();

        setCompanyName(name);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    if (suggestion.companyId) {
      fetchCompany();
    }
  }, [suggestion.companyId]);

  if (isLoading) {
    return (
      <Card className="flex h-52 w-96 gap-3 p-2 pr-5">
        <div className="flex w-full flex-col">
          <Skeleton className="mb-2 h-8 w-3/4" />
          <Skeleton className="mb-2 h-16 w-full" />{" "}
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-1/3" />{" "}
            <Skeleton className="h-5 w-1/4" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card
        className="flex h-52 w-96 cursor-pointer gap-3 p-2 pr-5"
        onClick={() => setIsModalOpen(true)}
      >
        <Badge className="p-1 hover:bg-primary"></Badge>

        <div className="flex h-full w-full flex-col justify-between overflow-hidden py-4 pr-2">
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
                        {companyName}
                      </span>
                    </TooltipTrigger>

                    <TooltipContent>{companyName}</TooltipContent>
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

                <AgentMultiSelect />
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
