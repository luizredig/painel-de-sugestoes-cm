import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllSuggestions = async (isActive?: boolean) => {
  return prisma.suggestion.findMany({
    where: {
      isActive: isActive !== undefined ? isActive : undefined,
    },
    include: {
      company: true,
      status: true,
      agents: true,
    },
  });
};

export const createSuggestion = async (data: {
  title: string;
  description?: string;
  isActive?: boolean;
  companyId: string;
}) => {
  const pendingStatus = await prisma.suggestionStatus.findUnique({
    where: { slug: "pendente" },
  });

  if (!pendingStatus) {
    throw new Error("Status 'Pendente' not found");
  }

  return prisma.suggestion.create({
    data: {
      title: data.title,
      description: data.description || null,
      isActive: data.isActive !== undefined ? data.isActive : true,
      company: { connect: { id: data.companyId } },
      status: { connect: { id: pendingStatus.id } },
    },
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
