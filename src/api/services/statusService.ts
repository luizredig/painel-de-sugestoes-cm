import * as statusRepository from "../repositories/statusRepository.ts";

export const createStatus = async (data: any) => {
  return await statusRepository.createStatus(data);
};

export const getAllStatuses = async () => {
  return await statusRepository.getAllStatuses();
};
