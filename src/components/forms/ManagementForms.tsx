// src/components/form/ManagementForms.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Company = {
  id: string;
  name: string;
  isActive: boolean;
};

type Suggestion = {
  id: string;
  title: string;
  description: string | null;
  isActive: boolean;
};

interface EditCompanyFormProps {
  company: Company;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const EditCompanyForm = ({
  company,
  onClose,
  onSuccess,
}: EditCompanyFormProps) => {
  const [name, setName] = useState<string>(company.name);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage("O nome da empresa não pode estar vazio.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/companies/${company.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        },
      );

      if (response.ok) {
        onSuccess("Empresa atualizada com sucesso!");
        onClose();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erro ao atualizar empresa.");
      }
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
      setErrorMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-3xl font-bold">Editar Empresa</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="mb-4 text-red-600">{errorMessage}</div>
          )}
          <label className="mb-6 block">
            Nome da Empresa:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded border p-3"
            />
          </label>
          <div className="flex justify-end space-x-4">
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface EditSuggestionFormProps {
  suggestion: Suggestion;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const EditSuggestionForm = ({
  suggestion,
  onClose,
  onSuccess,
}: EditSuggestionFormProps) => {
  const [title, setTitle] = useState<string>(suggestion.title);
  const [description, setDescription] = useState<string>(
    suggestion.description ?? "",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage("O título da sugestão não pode estar vazio.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/suggestions/${suggestion.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        },
      );

      if (response.ok) {
        onSuccess("Sugestão atualizada com sucesso!");
        onClose();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erro ao atualizar sugestão.");
      }
    } catch (error) {
      console.error("Erro ao atualizar sugestão:", error);
      setErrorMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-3xl font-bold">Editar Sugestão</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="mb-4 text-red-600">{errorMessage}</div>
          )}
          <label className="mb-6 block">
            Título:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded border p-3"
            />
          </label>
          <label className="mb-6 block">
            Descrição:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full rounded border p-3"
            />
          </label>
          <div className="flex justify-end space-x-4">
            <Button type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
