import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BuildingIcon } from "lucide-react";
import SuggestionDetails from "./SuggestionDetails";
import AgentMultiSelect from "../select/AgentMultiSelect";
import SuggestionStatusSelect from "@/components/select/SuggestionStatusSelect";
import { Skeleton } from "../ui/skeleton";
import { getStatusColorClasses } from "../../helpers/statusColorClasses";
import {
  Company,
  Suggestion,
  SuggestionStatus,
  SuggestionsAgent,
} from "@prisma/client";

type SuggestionCardProps = {
  suggestion: Suggestion & {
    company: Company;
    status: SuggestionStatus;
    agents: SuggestionsAgent[];
  };
  variant: "guestView" | "adminView";
};

const SuggestionCard = ({ suggestion, variant }: SuggestionCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAgentIds, setSelectedAgentIds] = useState<string[]>(
    suggestion.agents.map((agent) => agent.id),
  );
  const [agents, setAgents] = useState<SuggestionsAgent[]>([]);
  const [currentStatusSlug, setCurrentStatusSlug] = useState(
    suggestion.status.slug,
  );

  const statusClasses = getStatusColorClasses(currentStatusSlug);

  useEffect(() => {
    const fetchCompanyAndData = async () => {
      try {
        const [companyResponse, agentsResponse] = await Promise.all([
          fetch(`http://localhost:3000/api/companies/${suggestion.companyId}`),
          fetch("http://localhost:3000/api/agents"),
        ]);

        const { name } = await companyResponse.json();
        setCompanyName(name);

        const agentsData = await agentsResponse.json();
        setAgents(agentsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCompanyAndData();
  }, [suggestion.companyId]);

  const handleStatusChange = async (newStatusSlug: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/suggestions/${suggestion.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ statusSlug: newStatusSlug }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setCurrentStatusSlug(newStatusSlug);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAgentsChange = async (selectedIds: string[]) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/suggestions/${suggestion.id}/agents`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ agentIds: selectedIds }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update agents");
      }

      setSelectedAgentIds(selectedIds);
    } catch (error) {
      console.error("Error updating agents:", error);
    }
  };

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
        className={`flex h-52 w-96 cursor-pointer gap-3 p-2 pr-5 hover:bg-muted ${statusClasses.border}`}
        onClick={() => setIsModalOpen(true)}
      >
        <Badge className={`p-1 ${statusClasses.badge}`} />

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
                <SuggestionStatusSelect
                  disabled={variant === "guestView"}
                  currentStatus={currentStatusSlug}
                  onChange={handleStatusChange}
                />
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

                <AgentMultiSelect
                  disabled={variant === "guestView"}
                  selectedAgentIds={selectedAgentIds}
                  onChange={handleAgentsChange}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {isModalOpen && (
        <SuggestionDetails
          suggestion={{
            ...suggestion,
            status: { ...suggestion.status, slug: currentStatusSlug },
            agents: agents.filter((agent) =>
              selectedAgentIds.includes(agent.id),
            ),
          }}
          onClose={() => setIsModalOpen(false)}
          selectedAgentIds={selectedAgentIds}
          onAgentChange={handleAgentsChange}
        />
      )}
    </>
  );
};

export default SuggestionCard;
