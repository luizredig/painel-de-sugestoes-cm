import { AppWindowIcon, Building2Icon, CogIcon, ListIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <>
      {/* Sidebar */}
      <Card className="h-100 flex min-w-72 flex-col border-none p-0">
        {/* Header */}
        <CardHeader className="flex h-12 flex-row items-center justify-between bg-primary p-0">
          <img src="/logo.svg" alt="Logo" className="ml-5 h-6 w-6" />
        </CardHeader>

        {/* Content */}
        <CardContent className="flex flex-1 flex-col bg-secondary p-0">
          {/* Option - Painel de sugestões */}
          <SidebarItem
            type="button"
            title="Painel de sugestões"
            icon={<AppWindowIcon className="text-primary" />}
            path="/painel-de-sugestoes"
          />

          {/* Accordion - Sugestões */}
          <SidebarItem
            type="accordion"
            title="Sugestões"
            icon={<ListIcon className="text-primary" />}
          >
            <SidebarItem
              type="button"
              title="Gerenciar"
              icon={<CogIcon className="text-primary" size={20} />}
              path="/painel-de-sugestoes/gerenciar"
            />
          </SidebarItem>

          {/* Option - Empresas */}
          <SidebarItem
            type="button"
            title="Empresas"
            icon={<Building2Icon className="text-primary" />}
            path="/empresas"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Sidebar;
