import React, { useEffect, useState } from "react";
import Page from "../template/Page.ts";
import { prisma } from "@/lib/prisma.ts";
import CompanySuggestionRow from "@/components/suggestion/CompanySuggestionRow.ts";
import { Company, Suggestion } from "@prisma/client";

const SuggestionPanel = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Busca as empresas e suas sugestões do banco de dados
      const fetchedCompanies = await prisma.company.findMany();
      const fetchedSuggestions = await prisma.suggestion.findMany();

      setCompanies(fetchedCompanies);
      setSuggestions(fetchedSuggestions);
    };

    fetchData();
  }, []);

  return (
    <Page
      title="Painel de Sugestões"
      children={
        <div className="flex h-screen w-full flex-col gap-8 overflow-x-hidden">
          {companies.map((company) => (
            <CompanySuggestionRow
              key={company.id}
              company={company}
              suggestions={suggestions.filter(
                (suggestion) => suggestion.companyId === company.id,
              )}
            />
          ))}
        </div>
      }
    />
  );
};

export default SuggestionPanel;
