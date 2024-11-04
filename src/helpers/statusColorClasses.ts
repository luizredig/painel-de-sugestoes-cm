export const getStatusColorClasses = (statusSlug: string) => {
  switch (statusSlug) {
    case "novo":
      return {
        border: "border-blue-500",
        background: "bg-blue-500 text-white",
        badge: "bg-blue-500 text-white",
      };
    case "pendente":
      return {
        border: "border-yellow-500",
        background: "bg-yellow-500 text-white",
        badge: "bg-yellow-500 text-white",
      };
    case "concluido":
      return {
        border: "border-green-500",
        background: "bg-green-500 text-white",
        badge: "bg-green-500 text-white",
      };
    default:
      return {
        border: "border-gray-300",
        background: "bg-gray-300 text-black",
        badge: "bg-gray-300 text-black",
      };
  }
};
