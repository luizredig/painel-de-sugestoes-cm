import Page from "../template/Page";
import { mock } from "../../../environment/mock";
import CompanySuggestionRow from "@/components/suggestion/CompanySuggestionRow";
import Search from "@/components/search/Search";

const SuggestionPanel = () => {
  const suggestions = mock.Suggestion;
  const companies = mock.Company;

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
