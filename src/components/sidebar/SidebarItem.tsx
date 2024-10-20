import { Button } from "../ui/button.tsx";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion.tsx";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  type: "button" | "accordion";
  title: string;
  icon: React.ReactNode;
  path?: string;
  children?: React.ReactNode;
}

const SidebarItem = ({
  type,
  title,
  icon,
  path,
  children,
}: SidebarItemProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  if (type === "button") {
    return (
      <Button
        onClick={() => handleNavigate(path)}
        className="flex w-full justify-start gap-3 rounded-none border-[0.5px] border-x-0 border-t-0 border-muted-foreground bg-secondary px-5 py-7"
      >
        {icon}
        <span className="text-sm text-muted-foreground">{title}</span>
      </Button>
    );
  }

  if (type === "accordion") {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-muted-foreground">
          <AccordionTrigger className="flex justify-between rounded-none border-none bg-secondary px-5 text-muted-foreground">
            <div className="flex items-center justify-center gap-3 border-none">
              {icon}

              <span className="text-sm text-muted-foreground">{title}</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-col border-none p-0">
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return null;
};

export default SidebarItem;
