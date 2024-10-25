import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSuggestion = async (data: any) => {
  return prisma.suggestion.create({
    data,
  });
};

export const getAllSuggestions = async () => {
  return prisma.suggestion.findMany({
    include: {
      company: true,
      status: true,
      agents: true,
    },
  });
};

export const deleteSuggestion = async (id: string) => {
  return prisma.suggestion.delete({
    where: { id },
  });
};
