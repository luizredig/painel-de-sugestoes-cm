import { Card, CardContent, CardHeader } from "../ui/card";
import SidebarItem from "./SidebarItem";
import { AppWindowIcon, CogIcon, ListIcon } from "lucide-react";

const Sidebar = () => {
  return (
    <>
      <Card className="h-100 flex min-w-72 flex-col border-none p-0">
        <CardHeader className="flex h-12 flex-row items-center justify-between bg-primary p-0">
          <img src="/logo.svg" alt="Logo" className="ml-5 h-6 w-6" />
        </CardHeader>

        <CardContent className="flex flex-1 flex-col bg-secondary p-0">
          <SidebarItem
            type="button"
            title="Painel de sugestões"
            icon={<AppWindowIcon className="text-primary" />}
            path="/painel-de-sugestoes"
          />

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
        </CardContent>
      </Card>
    </>
  );
};

export default Sidebar;
