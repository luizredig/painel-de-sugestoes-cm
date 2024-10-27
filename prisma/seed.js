import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {
  try {
    const statuses = [
      { name: "Pendente", slug: "pendente" },
      { name: "Em andamento", slug: "em-andamento" },
      { name: "Concluído", slug: "concluido" },
    ];

    await prismaClient.suggestionStatus.createMany({
      data: statuses,
      skipDuplicates: true,
    });

    const agents = [
      { name: "Murilo Diego" },
      { name: "Diego Tomaz" },
      { name: "Mariana Marques" },
      { name: "João" },
      { name: "Bianca" },
    ];

    await prismaClient.suggestionsAgent.createMany({
      data: agents,
      skipDuplicates: true,
    });

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prismaClient.$disconnect();
  }
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
  });
