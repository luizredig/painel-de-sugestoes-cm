import { Prisma } from "@prisma/client";
import * as suggestionRepository from "../repositories/suggestionRepository";
import * as statusRepository from "../repositories/statusRepository";

export const getAllSuggestions = async (isActive?: boolean) => {
  return await suggestionRepository.getAllSuggestions(isActive);
};

export const createSuggestion = async (data: {
  title: string;
  description?: string;
  isActive?: boolean;
  companyId: string;
}) => {
  return await suggestionRepository.createSuggestion(data);
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

export const updateSuggestionStatus = async (
  id: string,
  statusSlug: string,
) => {
  const status = await statusRepository.getStatusBySlug(statusSlug);
  if (!status) {
    throw new Error("Status not found");
  }

  return await suggestionRepository.updateSuggestion(id, {
    status: { connect: { id: status.id } },
  });
};

export const updateSuggestionAgents = async (
  id: string,
  agentIds: string[],
) => {
  return await suggestionRepository.updateSuggestion(id, {
    agents: {
      set: agentIds.map((agentId) => ({ id: agentId })),
    },
  });
};
