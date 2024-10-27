import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const createSuggestion = async (data: Prisma.SuggestionCreateInput) => {
  return prisma.suggestion.create({
    data,
  });
};

export const deleteSuggestion = async (id: string) => {
  return prisma.suggestion.delete({
    where: { id },
  });
};

export const updateSuggestion = async (
  id: string,
  data: Prisma.SuggestionUpdateInput,
) => {
  return prisma.suggestion.update({
    where: { id },
    data,
  });
};

export const getAllSuggestions = async (isActive?: boolean) => {
  return prisma.suggestion.findMany({
    where: {
      isActive: isActive !== undefined ? isActive : undefined,
    },
    include: {
      company: true, // Inclui os dados da empresa
    },
  });
};
