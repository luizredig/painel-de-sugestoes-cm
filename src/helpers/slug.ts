export const formatToSlug = (str: string): string => {
  return str
    .toLowerCase() // Converte tudo para minúsculas
    .trim() // Remove espaços extras nas extremidades
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/[^\w-]+/g, "") // Remove caracteres especiais, exceto hífens e underscores
    .replace(/--+/g, "-"); // Substitui múltiplos hífens por um único hífen
};
