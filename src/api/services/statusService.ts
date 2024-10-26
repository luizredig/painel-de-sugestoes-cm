import { Prisma } from "@prisma/client";
import * as statusRepository from "../repositories/statusRepository";

export const createStatus = async (
  data: Prisma.SuggestionStatusCreateInput,
) => {
  return await statusRepository.createStatus(data);
};

export const getAllStatuses = async () => {
  return await statusRepository.getAllStatuses();
};
