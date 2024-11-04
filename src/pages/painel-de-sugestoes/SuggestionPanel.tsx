import { useEffect, useState } from "react";
import Page from "../template/Page";
import Search from "@/components/search/Search";
import CompanySuggestionRow from "@/components/suggestion/CompanySuggestionRow";
import FilteredSuggestionRow from "@/components/suggestion/FilteredSuggestionRow";
import { Sparkles } from "lucide-react";
import Spinner from "@/components/loading/Spinner";

const SuggestionPanel = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    company: "empty",
    status: "empty",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/companies/with-suggestions",
        );
        const fetchedCompanies = await response.json();
        setCompanies(fetchedCompanies);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (data: any) => {
    setFilters(data);
  };

  const clearFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      company: "empty",
      status: "empty",
    });
  };

  const isFilterActive =
    filters.startDate ||
    filters.endDate ||
    filters.company !== "empty" ||
    filters.status !== "empty";

  return (
    <Page
      title="Painel de Sugestões"
      children={
        <div className="flex w-full flex-col">
          <div className="z-10 bg-muted p-5 shadow">
            <Search onSearch={handleSearch} onClearFilters={clearFilters} />
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
            ) : isFilterActive ? (
              <FilteredSuggestionRow companies={companies} filters={filters} />
            ) : (
              companies.map((company: any) => (
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
