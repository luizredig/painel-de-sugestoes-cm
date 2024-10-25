import * as statusRepository from "../repositories/statusRepository";

export const createStatus = async (data: any) => {
  return await statusRepository.createStatus(data);
};

export const getAllStatuses = async () => {
  return await statusRepository.getAllStatuses();
};
