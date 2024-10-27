import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Snackbar from "../ui/snackbar";

interface Company {
  id: string;
  name: string;
  isActive: boolean;
}

// Formulário de criação de sugestão
export const CreateSuggestionForm = ({
  companies,
}: {
  companies: Company[];
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !companyId) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, companyId }),
      });

      if (response.ok) {
        setSnackbarVisible(true);
        setTitle("");
        setDescription("");
        setCompanyId("");
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erro ao cadastrar sugestão.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar sugestão:", error);
      setErrorMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-auto">
      <Snackbar
        message="Sugestão cadastrada com sucesso!"
        isVisible={snackbarVisible}
        onClose={() => setSnackbarVisible(false)}
      />

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <label className="text-sm font-semibold text-muted-foreground">
        Título da Sugestão *
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded border p-3 text-sm"
          placeholder="Digite o título da sugestão"
          required
        />
      </label>

      <label className="text-sm font-semibold text-muted-foreground">
        Descrição
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 w-full resize-none rounded border p-3 text-sm"
          placeholder="Descreva brevemente a sugestão"
          rows={4}
        />
      </label>

      <label className="text-sm font-semibold text-muted-foreground">
        Empresa Relacionada *
        <Select
          value={companyId}
          onValueChange={(value) => setCompanyId(value)}
          required
        >
          <SelectTrigger aria-label="Empresa">
            <SelectValue placeholder="Selecione uma empresa" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>

      <button
        type="submit"
        className="mt-4 rounded bg-primary p-3 text-white hover:bg-primary/80"
      >
        Enviar Sugestão
      </button>
    </form>
  );
};

// Formulário de criação de empresa
export const CreateCompanyForm = ({
  onCompanyCreated,
}: {
  onCompanyCreated: () => void;
}) => {
  const [name, setName] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setErrorMessage("Por favor, insira o nome da empresa.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, isActive: true }),
      });

      if (response.ok) {
        setSnackbarVisible(true);
        setName("");
        onCompanyCreated();
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erro ao cadastrar empresa.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar empresa:", error);
      setErrorMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-auto">
      <Snackbar
        message="Empresa cadastrada com sucesso!"
        isVisible={snackbarVisible}
        onClose={() => setSnackbarVisible(false)}
      />

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <label className="text-sm font-semibold text-muted-foreground">
        Nome da Empresa *
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded border p-3 text-sm"
          placeholder="Digite o nome da empresa"
          required
        />
      </label>

      <button
        type="submit"
        className="mt-4 rounded bg-primary p-3 text-white hover:bg-primary/80"
      >
        Cadastrar Empresa
      </button>
    </form>
  );
};
