import { CreateSuggestionForm } from "@/components/forms/CreationForms";
import Page from "@/pages/template/Page";
import { useState, useEffect } from "react";

const CreateSuggestionOnly = () => {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/companies");
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Page
      title="Cadastro de Sugestão"
      children={
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
          <div className="flex w-full max-w-lg flex-col rounded-lg border p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              Cadastro de Sugestão
            </h2>

            <p className="mb-4 text-muted-foreground">
              Preencha os campos abaixo para cadastrar uma nova sugestão de
              melhoria ou feedback ao Carga Máquina.
            </p>

            <CreateSuggestionForm companies={companies} />
          </div>
        </div>
      }
    />
  );
};

export default CreateSuggestionOnly;
