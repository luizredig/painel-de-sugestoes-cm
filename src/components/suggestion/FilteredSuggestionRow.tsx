import React from "react";
import CompanySuggestionRow from "./CompanySuggestionRow";

const FilteredSuggestionRow = ({
  companies,
  filters,
}: {
  companies: any;
  filters: any;
}) => {
  const { startDate, endDate, company, status } = filters;

  // Filtrar empresas e sugestões com base nos critérios de filtro
  const filteredCompanies = companies
    .filter((c: any) => company === "empty" || c.id === company)
    .map((c: any) => ({
      ...c,
      suggestions: c.suggestions.filter((s: any) => {
        const suggestionDate = new Date(s.createdAt);
        const isInDateRange =
          (!startDate || suggestionDate >= startDate) &&
          (!endDate || suggestionDate <= endDate);
        const matchesStatus = status === "empty" || s.status.slug === status;
        return isInDateRange && matchesStatus;
      }),
    }))
    .filter((c: any) => c.suggestions.length > 0);

  return (
    <div className="flex flex-col gap-4">
      {filteredCompanies.map((c: any) => (
        <CompanySuggestionRow
          key={c.id}
          company={c}
          suggestions={c.suggestions}
        />
      ))}
    </div>
  );
};

export default FilteredSuggestionRow;
