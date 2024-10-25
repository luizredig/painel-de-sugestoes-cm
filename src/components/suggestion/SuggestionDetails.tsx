import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
import { format } from "date-fns";
import { prismaClient } from "@/lib/prisma";
import { Suggestion, SuggestionsAgent, SuggestionStatus } from "@prisma/client";

type SuggestionDetailsProps = {
  suggestionId: string;
  onClose: () => void;
};

type SuggestionWithAgentsAndStatus = Suggestion & {
  agents: SuggestionsAgent[];
  status: SuggestionStatus;
};

const SuggestionDetails = ({
  suggestionId,
  onClose,
}: SuggestionDetailsProps) => {
  const [suggestion, setSuggestion] =
    useState<SuggestionWithAgentsAndStatus | null>(null);

  useEffect(() => {
    const fetchSuggestionDetails = async () => {
      const fetchedSuggestion = await prismaClient.suggestion.findUnique({
        where: { id: suggestionId },
        include: {
          agents: true,
          status: true,
        },
      });

      setSuggestion(fetchedSuggestion);
    };

    fetchSuggestionDetails();
  }, [suggestionId]);

  if (!suggestion) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="relative w-full max-w-2xl rounded-lg bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <XIcon size={24} />
        </button>

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
            <Badge className="no-hover mt-2 p-2 text-sm">
              {suggestion.status.name}
            </Badge>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">
              Responsáveis
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestion.agents.map((agent) => (
                <Badge key={agent.id} className="no-hover p-2 text-sm">
                  {agent.name}
                </Badge>
              ))}
            </div>
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
