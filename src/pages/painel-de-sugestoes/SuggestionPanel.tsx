import Search from "@/components/search/Search";
import CompanySuggestionRow from "@/components/suggestion/CompanySuggestionRow";
import { Company, Suggestion } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Page from "../template/Page";

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
    <Page
      title="Painel de Sugestões"
      children={
        <div className="flex w-full flex-col">
          <div className="z-10 bg-muted p-5 shadow">
            <Search />
          </div>

          <div className="flex h-screen w-full flex-col overflow-y-scroll">
            {companies.map((company) => (
              <CompanySuggestionRow
                key={company.id}
                company={company}
                suggestions={suggestions}
              />
            ))}
          </div>
        </div>
      }
    />
  );
};

export default SuggestionPanel;
