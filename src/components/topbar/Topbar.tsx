import { LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useAuth } from "../../auth/AuthProvider";

type TopbarProps = {
  title: string;
};

const Topbar = ({ title }: TopbarProps) => {
  const { logout, role } = useAuth();

  return (
    <>
      <Card className="flex min-h-12 w-full items-center justify-between rounded-none border-x-0 border-t-0 px-5">
        <p className="text-sm font-semibold text-primary">{title}</p>

        <div className="flex gap-2">
          <TooltipProvider>
            {role === "guest" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={logout} variant={"outline"} size={"icon"}>
                    <UserIcon className="text-primary" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Admin</span>
                </TooltipContent>
              </Tooltip>
            )}

            {role === "admin" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={logout} variant={"outline"} size={"icon"}>
                    <LogOutIcon className="text-primary" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Logout</span>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      </Card>
    </>
  );
};

export default Topbar;
