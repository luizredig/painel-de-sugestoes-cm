import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
import { format } from "date-fns";
import { SuggestionsAgent, SuggestionStatus, Suggestion } from "@prisma/client";
import { Button } from "../ui/button";
import AgentMultiSelect from "../select/AgentMultiSelect";
import { getStatusColorClasses } from "../../helpers/statusColorClasses";

type SuggestionDetailsProps = {
  suggestion: Suggestion & {
    status: SuggestionStatus;
    agents: SuggestionsAgent[];
  };
  selectedAgentIds: string[];
  onAgentChange: (selectedIds: string[]) => void;
  onClose: () => void;
};

const SuggestionDetails = ({
  suggestion,
  selectedAgentIds,
  onAgentChange,
  onClose,
}: SuggestionDetailsProps) => {
  const statusClasses = getStatusColorClasses(suggestion.status.slug);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card
        className={`relative w-full max-w-2xl rounded-lg bg-white p-8 shadow-2xl ${statusClasses.border}`}
      >
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <XIcon size={24} />
        </Button>

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {suggestion.title}
          </h2>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Descrição</h3>
            <p className="mt-2 text-gray-600">{suggestion.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Status</h3>
            <Badge className={`mt-2 p-2 text-sm ${statusClasses.badge}`}>
              {suggestion.status?.name}
            </Badge>
          </div>

          <div className="max-w-[25%]">
            <h3 className="text-xl font-semibold text-gray-700">
              Responsáveis
            </h3>
            <AgentMultiSelect
              selectedAgentIds={selectedAgentIds}
              onChange={onAgentChange}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">
              Data de Criação
            </h3>
            <p className="mt-2 text-gray-600">
              {format(new Date(suggestion.createdAt), "dd/MM/yyyy")}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SuggestionDetails;
