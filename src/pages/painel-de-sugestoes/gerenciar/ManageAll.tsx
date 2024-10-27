import {
  EditCompanyForm,
  EditSuggestionForm,
} from "@/components/forms/ManagementForms";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datagrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import Snackbar from "@/components/ui/snackbar";
import Page from "@/pages/template/Page";
import { Company, Suggestion } from "@/types/types";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ManageAll = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showActiveCompanies, setShowActiveCompanies] = useState(true);
  const [showActiveSuggestions, setShowActiveSuggestions] = useState(true);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [editingSuggestion, setEditingSuggestion] = useState<Suggestion | null>(
    null,
  );
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchCompanies = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/companies?isActive=${showActiveCompanies}`,
      );
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setSnackbarMessage("Erro ao buscar empresas.");
    }
  }, [showActiveCompanies]);

  const fetchSuggestions = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/suggestions?isActive=${showActiveSuggestions}`,
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSnackbarMessage("Erro ao buscar sugestões.");
    }
  }, [showActiveSuggestions]);

  useEffect(() => {
    fetchCompanies();
    fetchSuggestions();
  }, [
    showActiveCompanies,
    showActiveSuggestions,
    fetchCompanies,
    fetchSuggestions,
  ]);

  const toggleCompanyStatus = async (company: Company) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/companies/${company.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: !company.isActive }),
        },
      );

      if (response.ok) {
        fetchCompanies();
        setSnackbarMessage(
          `Empresa ${company.isActive ? "inativada" : "ativada"} com sucesso!`,
        );
      } else {
        setSnackbarMessage("Erro ao atualizar status da empresa.");
      }
    } catch (error) {
      console.error("Error toggling company status:", error);
      setSnackbarMessage("Erro ao atualizar status da empresa.");
    }
  };

  const toggleSuggestionStatus = async (suggestion: Suggestion) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/suggestions/${suggestion.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: !suggestion.isActive }),
        },
      );

      if (response.ok) {
        fetchSuggestions();
        setSnackbarMessage(
          `Sugestão ${suggestion.isActive ? "inativada" : "ativada"} com sucesso!`,
        );
      } else {
        setSnackbarMessage("Erro ao atualizar status da sugestão.");
      }
    } catch (error) {
      console.error("Error toggling suggestion status:", error);
      setSnackbarMessage("Erro ao atualizar status da sugestão.");
    }
  };

  const companyColumns: ColumnDef<Company, any>[] = [
    {
      header: "Nome da Empresa",
      accessorKey: "name",
      cell: ({ row }: CellContext<Company, any>) => (
        <div className="whitespace-normal break-all">{row.original.name}</div>
      ),
    },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }: CellContext<Company, any>) => (
        <div className="whitespace-normal break-all">
          {row.original.isActive ? "Ativa" : "Inativa"}
        </div>
      ),
    },
    {
      header: "Ações",
      cell: ({ row }: CellContext<Company, any>) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditingCompany(row.original)}
          >
            <PencilIcon className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleCompanyStatus(row.original)}
            className={`text-sm transition-colors duration-200 ${
              row.original.isActive
                ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            } rounded`}
          >
            {row.original.isActive ? "Inativar" : "Ativar"}
          </Button>
        </div>
      ),
    },
  ];

  const suggestionColumns: ColumnDef<Suggestion, any>[] = [
    {
      header: "Título",
      accessorKey: "title",
      cell: ({ row }: CellContext<Suggestion, any>) => (
        <div className="whitespace-normal break-all">{row.original.title}</div>
      ),
    },
    {
      header: "Descrição",
      accessorKey: "description",
      cell: ({ row }: CellContext<Suggestion, any>) => (
        <div className="whitespace-normal break-all">
          {row.original.description}
        </div>
      ),
    },
    {
      header: "Empresa Relacionada",
      cell: ({ row }: CellContext<Suggestion, any>) => (
        <div className="whitespace-normal break-all">
          {row.original.company?.name || "Empresa não encontrada"}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }: CellContext<Suggestion, any>) => (
        <div className="whitespace-normal break-all">
          {row.original.isActive ? "Ativa" : "Inativa"}
        </div>
      ),
    },
    {
      header: "Ações",
      cell: ({ row }: CellContext<Suggestion, any>) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditingSuggestion(row.original)}
          >
            <PencilIcon className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSuggestionStatus(row.original)}
            className={`text-sm transition-colors duration-200 ${
              row.original.isActive
                ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            } rounded`}
          >
            {row.original.isActive ? "Inativar" : "Ativar"}
          </Button>
        </div>
      ),
    },
  ];

  const handleEditCompanySuccess = (message: string) => {
    setSnackbarMessage(message);
    fetchCompanies();
  };

  const handleEditSuggestionSuccess = (message: string) => {
    setSnackbarMessage(message);
    fetchSuggestions();
  };

  return (
    <Page title="Gerenciamento de Empresas e Sugestões">
      <div className="flex w-full flex-col p-6">
        <Snackbar
          message={snackbarMessage || ""}
          isVisible={!!snackbarMessage}
          onClose={() => setSnackbarMessage(null)}
        />

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-primary">Gerenciamento</h1>
          <Button
            variant="default"
            onClick={() => navigate("/painel-de-sugestoes/create")}
            className="hover:bg-primary-dark rounded bg-primary text-white transition-colors duration-200"
          >
            Cadastrar
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="flex flex-col lg:col-span-3">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-primary">Sugestões</h2>
              <Button
                onClick={() => setShowActiveSuggestions(!showActiveSuggestions)}
                className={`rounded text-white transition-colors duration-200 ${
                  showActiveSuggestions
                    ? "hover:bg-primary-dark bg-primary"
                    : "hover:bg-secondary-dark bg-secondary"
                }`}
              >
                {showActiveSuggestions ? "Mostrar Inativas" : "Mostrar Ativas"}
              </Button>
            </div>
            <span className="mb-4 text-sm text-gray-500">
              {showActiveSuggestions ? "Ativas" : "Inativas"}
            </span>
            <ScrollArea className="max-h-[28rem] pr-2">
              <DataTable data={suggestions} columns={suggestionColumns} />
            </ScrollArea>
          </div>

          <div className="flex flex-col lg:col-span-2">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-primary">Empresas</h2>
              <Button
                onClick={() => setShowActiveCompanies(!showActiveCompanies)}
                className={`rounded text-white transition-colors duration-200 ${
                  showActiveCompanies
                    ? "hover:bg-primary-dark bg-primary"
                    : "hover:bg-secondary-dark bg-secondary"
                }`}
              >
                {showActiveCompanies ? "Mostrar Inativas" : "Mostrar Ativas"}
              </Button>
            </div>
            <span className="mb-4 text-sm text-gray-500">
              {showActiveCompanies ? "Ativas" : "Inativas"}
            </span>
            <ScrollArea className="max-h-[28rem] pr-2">
              <DataTable data={companies} columns={companyColumns} />
            </ScrollArea>
          </div>
        </div>

        {editingCompany && (
          <EditCompanyForm
            company={editingCompany}
            onClose={() => {
              setEditingCompany(null);
              fetchCompanies();
            }}
            onSuccess={handleEditCompanySuccess}
          />
        )}

        {editingSuggestion && (
          <EditSuggestionForm
            suggestion={editingSuggestion}
            onClose={() => {
              setEditingSuggestion(null);
              fetchSuggestions();
            }}
            onSuccess={handleEditSuggestionSuccess}
          />
        )}
      </div>
    </Page>
  );
};

export default ManageAll;
