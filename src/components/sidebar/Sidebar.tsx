import { useAuth } from "@/components/Auth/AuthProvider";
import { AppWindowIcon, LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const { logout, role } = useAuth();

  return (
    <Card className="h-100 flex min-w-72 flex-col border-none p-0">
      <CardHeader className="flex h-12 flex-row items-center justify-between bg-primary p-0">
        <img src="/logo.svg" alt="Logo" className="ml-5 h-6 w-6" />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col bg-secondary p-0">
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

        <Button
          onClick={logout}
          className="mt-auto flex w-full justify-start gap-3 rounded-none border-[0.5px] border-x-0 border-t-0 border-muted-foreground bg-secondary px-5 py-7"
        >
          <LogOutIcon className="text-primary" />
          <span className="text-sm text-muted-foreground">Logout</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
