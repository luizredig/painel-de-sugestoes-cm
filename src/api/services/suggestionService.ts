import { Prisma } from "@prisma/client";
import * as suggestionRepository from "../repositories/suggestionRepository";
import * as statusRepository from "../repositories/statusRepository";
import { formatToSlug } from "../../helpers/slug";

export const getAllSuggestions = async (isActive?: boolean) => {
  return await suggestionRepository.getAllSuggestions(isActive);
};

export const deleteSuggestion = async (id: string) => {
  return await suggestionRepository.deleteSuggestion(id);
};

export const updateSuggestion = async (
  id: string,
  data: Prisma.SuggestionUpdateInput,
) => {
  return await suggestionRepository.updateSuggestion(id, data);
};

export const getOrCreateStatusByName = async (name: string) => {
  let status = await statusRepository.getStatusByName(name);
  if (!status) {
    const slug = formatToSlug(name);
    status = await statusRepository.createStatus({ name, slug });
  }
  return status;
};

export const createSuggestion = async (data: Prisma.SuggestionCreateInput) => {
  return await suggestionRepository.createSuggestion(data);
};
