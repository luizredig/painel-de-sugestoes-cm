import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const createSuggestion = async (data: Prisma.SuggestionCreateInput) => {
  try {
    const pendingStatus = await prisma.suggestionStatus.findUnique({
      where: { slug: "pendente" },
    });

    if (!pendingStatus) {
      throw new Error("Status 'Pendente' não encontrado");
    }

    return prisma.suggestion.create({
      data: {
        ...data,
        status: {
          connect: { id: pendingStatus.id },
        },
      },
    });
  } catch (error) {
    console.error("Erro ao criar sugestão:", error);
    throw error;
  }
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
