import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import SuggestionCard from "./SuggestionCard";
import { Company, Suggestion, SuggestionStatus } from "@prisma/client";
import { prismaClient } from "@/lib/prisma";

type CompanyDetailsProps = {
  companyId: string;
  onClose: () => void;
};

type SuggestionWithStatus = Suggestion & {
  status: SuggestionStatus;
};

const CompanyDetails = ({ companyId, onClose }: CompanyDetailsProps) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [suggestionsByStatus, setSuggestionsByStatus] = useState<{
    [status: string]: SuggestionWithStatus[];
  }>({});

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const fetchedCompany = await prismaClient.company.findUnique({
        where: { id: companyId },
      });

      const suggestions = await prismaClient.suggestion.findMany({
        where: { companyId },
        include: { status: true },
      });

      const groupedByStatus = suggestions.reduce(
        (groups, suggestion) => {
          const statusName = suggestion.status.name || "Sem Status";
          if (!groups[statusName]) {
            groups[statusName] = [];
          }
          groups[statusName].push(suggestion);
          return groups;
        },
        {} as { [status: string]: SuggestionWithStatus[] },
      );

      setCompany(fetchedCompany);
      setSuggestionsByStatus(groupedByStatus);
    };

    fetchCompanyDetails();
  }, [companyId]);

  const statusOrder = [
    "Pendente",
    "Em Progresso",
    "Aprovado",
    "Concluído",
    "Rejeitado",
  ];

  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="relative w-full max-w-7xl rounded-lg bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <XIcon size={24} />
        </button>

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-800">{company.name}</h2>

          <div className="grid grid-cols-5 gap-4">
            {statusOrder.map((status) => (
              <div key={status} className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-700">
                  {status}
                </h3>
                <div className="mt-2 flex flex-col gap-2">
                  {suggestionsByStatus[status]?.length > 0 ? (
                    suggestionsByStatus[status].map((suggestion) => (
                      <SuggestionCard
                        key={suggestion.id}
                        suggestion={suggestion}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">Nenhuma sugestão</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompanyDetails;
