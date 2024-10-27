import {
  CreateSuggestionForm,
  CreateCompanyForm,
} from "@/components/forms/CreationForms";
import Page from "@/pages/template/Page";
import { useState, useEffect } from "react";

const CreateSuggestionsAndCompanies = () => {
  const [companies, setCompanies] = useState([]);

  // Função para buscar as empresas
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
    fetchCompanies(); // Busca as empresas ao carregar a página
  }, []);

  const onCompanyCreated = () => {
    fetchCompanies(); // Atualiza a lista de empresas após cadastrar nova empresa
  };

  return (
    <Page
      title="Cadastro de Sugestão e Empresa"
      children={
        <div className="flex w-full flex-col p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Formulário de Criação de Sugestão */}
            <div className="flex flex-col rounded-lg border bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-semibold text-primary">
                Cadastro de Sugestão
              </h2>
              <p className="mb-4 text-muted-foreground">
                Preencha os campos abaixo para cadastrar uma nova sugestão
                relacionada a uma empresa.
              </p>
              <CreateSuggestionForm companies={companies} />
            </div>

            {/* Formulário de Criação de Empresa */}
            <div className="flex flex-col rounded-lg border bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-semibold text-primary">
                Cadastro de Empresa
              </h2>
              <p className="mb-4 text-muted-foreground">
                Preencha os campos abaixo para cadastrar uma nova empresa, que
                poderá receber sugestões.
              </p>
              <CreateCompanyForm onCompanyCreated={onCompanyCreated} />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default CreateSuggestionsAndCompanies;
