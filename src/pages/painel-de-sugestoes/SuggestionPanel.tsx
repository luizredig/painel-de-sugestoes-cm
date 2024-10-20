import React, { useEffect, useState } from "react";
import Page from "../template/Page.tsx";
import CompanySuggestionRow from "@/components/suggestion/CompanySuggestionRow.tsx";
import { Company, Suggestion } from "@/types/index.ts";

const SuggestionPanel = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesResponse, suggestionsResponse] = await Promise.all([
          fetch("http://localhost:3000/api/companies"),
          fetch("http://localhost:3000/api/suggestions"),
        ]);

        const fetchedCompanies: Company[] = await companiesResponse.json();
        const fetchedSuggestions: Suggestion[] =
          await suggestionsResponse.json();

        setCompanies(fetchedCompanies);
        setSuggestions(fetchedSuggestions);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Page title="Painel de Sugestões">
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
    </Page>
  );
};

export default SuggestionPanel;
