import React from "react";
import { Button } from "../ui/button.tsx";

interface SidebarButtonProps {
  children?: React.ReactNode;
  className?: string;
}

const SidebarButton = ({ children, className }: SidebarButtonProps) => {
  return (
    <>
      <Button
        variant={"outline"}
        className={`flex justify-start gap-3 rounded-none border-0 border-b-2 border-muted-foreground bg-secondary py-7 pl-5 hover:bg-black/30 ${className}`}
      >
        {children}
      </Button>
    </>
  );
};

export default SidebarButton;
