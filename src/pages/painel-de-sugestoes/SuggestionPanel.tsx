import Search from "@/components/search/Search";
import CompanySuggestionRow from "@/components/suggestion/CompanySuggestionRow";
import { Company, Suggestion } from "@prisma/client";
import { useEffect, useState } from "react";
import Page from "../template/Page";
import { Sparkles } from "lucide-react";
import Spinner from "@/components/loading/Spinner";

const SuggestionPanel = () => {
  const [companies, setCompanies] = useState<
    (Company & { suggestions: Suggestion[] })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesResponse = await fetch(
          "http://localhost:3000/api/companies/with-suggestions",
        );
        const fetchedCompanies = await companiesResponse.json();

        setCompanies(fetchedCompanies);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
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
            {isLoading ? (
              <div className="flex flex-1 items-center justify-center p-5">
                <Spinner />
              </div>
            ) : companies.length === 0 ? (
              <div className="flex flex-1 items-center justify-center gap-1 p-5">
                <Sparkles className="text-primary" />

                <p className="select-none text-muted-foreground">
                  Nenhuma sugestão, por enquanto!
                </p>
              </div>
            ) : (
              companies.map((company) => (
                <CompanySuggestionRow
                  key={company.id}
                  company={company}
                  suggestions={company.suggestions}
                />
              ))
            )}
          </div>
        </div>
      }
    />
  );
};

export default SuggestionPanel;
