import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSuggestion = async (data: Prisma.SuggestionCreateInput) => {
  return prisma.suggestion.create({
    data,
  });
};

export const getAllSuggestions = async () => {
  return prisma.suggestion.findMany();
};

export const deleteSuggestion = async (id: string) => {
  return prisma.suggestion.delete({
    where: { id },
  });
};
