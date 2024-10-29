import { useAuth } from "@/auth/AuthProvider";
import { AppWindowIcon, PlusIcon, UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const { role } = useAuth();

  return (
    <Card className="h-100 flex min-w-72 flex-col border-none p-0">
      <CardHeader className="flex h-12 flex-row items-center justify-between bg-primary p-0">
        <img src="/logo.svg" alt="Logo" className="ml-5 h-6 w-6" />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col bg-secondary p-0">
        {role === "guest" && (
          <SidebarItem
            type="button"
            title="Cadastro de sugestão"
            icon={<PlusIcon className="text-primary" />}
            path="/inicio"
          />
        )}

        {role === "admin" && (
          <SidebarItem
            type="button"
            title="Administrador"
            icon={<UserIcon className="text-primary" />}
            path="/painel-de-sugestoes/gerenciar"
          />
        )}

        <SidebarItem
          type="button"
          title="Painel de sugestões"
          icon={<AppWindowIcon className="text-primary" />}
          path="/painel-de-sugestoes"
        />
      </CardContent>
    </Card>
  );
};

export default Sidebar;
