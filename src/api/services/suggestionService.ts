import * as suggestionRepository from "../repositories/suggestionRepository.ts";

export const createSuggestion = async (data: any) => {
  return await suggestionRepository.createSuggestion(data);
};

export const getAllSuggestions = async () => {
  return await suggestionRepository.getAllSuggestions();
};

export const deleteSuggestion = async (id: string) => {
  return await suggestionRepository.deleteSuggestion(id);
};
