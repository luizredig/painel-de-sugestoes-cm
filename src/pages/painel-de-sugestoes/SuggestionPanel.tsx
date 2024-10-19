import Page from "../template/Page";
import { mock } from "../../../environment/mock";
import CompanySuggestionRow from "@/components/suggestion/CompanySuggestionRow";

const SuggestionPanel = () => {
  const suggestions = mock.Suggestion;
  const companies = mock.Company;

  return (
    <Page
      title="Painel de Sugestões"
      children={
        <div className="flex h-screen w-full flex-col gap-8 p-5">
          {companies.map((company) => (
            <CompanySuggestionRow
              key={company.id}
              company={company}
              suggestions={suggestions}
            />
          ))}
        </div>
      }
    />
  );
};

export default SuggestionPanel;
