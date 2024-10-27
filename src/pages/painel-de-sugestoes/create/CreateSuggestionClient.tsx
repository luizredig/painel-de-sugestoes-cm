// src/pages/painel-de-sugestoes/create/CreateSuggestionClient.tsx

import { CreateSuggestionForm } from "@/components/forms/CreationForms";
import Page from "@/pages/template/Page";
import { useState, useEffect } from "react";

const CreateSuggestionOnly = () => {
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

  return (
    <Page
      title="Cadastro de Sugestão"
      children={
        <div className="flex w-full flex-col items-center justify-center p-6">
          <div className="flex w-full max-w-lg flex-col rounded-lg border bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              Cadastro de Sugestão
            </h2>
            <p className="mb-4 text-muted-foreground">
              Preencha os campos abaixo para cadastrar uma nova sugestão
              relacionada a uma empresa. No último campo, selecione a empresa
              relacionada.
            </p>
            {/* Formulário de Criação de Sugestão */}
            <CreateSuggestionForm companies={companies} />
          </div>
        </div>
      }
    />
  );
};

export default CreateSuggestionOnly;
