import { Prisma } from "@prisma/client";
import * as suggestionRepository from "../repositories/suggestionRepository";

export const createSuggestion = async (data: Prisma.SuggestionCreateInput) => {
  return await suggestionRepository.createSuggestion(data);
};

export const getAllSuggestions = async () => {
  return await suggestionRepository.getAllSuggestions();
};

export const deleteSuggestion = async (id: string) => {
  return await suggestionRepository.deleteSuggestion(id);
};
