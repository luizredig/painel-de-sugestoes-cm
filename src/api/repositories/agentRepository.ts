import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAgents = async () => {
  return prisma.suggestionsAgent.findMany({});
};
