import * as agentRepository from "../repositories/agentRepository";

export const getAllAgents = async () => {
  return await agentRepository.getAllAgents();
};
