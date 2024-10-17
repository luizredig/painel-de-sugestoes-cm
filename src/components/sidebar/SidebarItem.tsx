import React from "react";
import SidebarButton from "./SidebarButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface TriggerProps {
  icon: React.ReactNode;
  title: string;
}

interface AccordionProps {
  variant: "accordion";
  trigger: TriggerProps;
  content: React.ReactNode;
}

interface ButtonProps {
  variant: "button";
  content: TriggerProps;
  children: React.ReactNode;
}

type SidebarButtonProps = AccordionProps | ButtonProps;

const SidebarItem = (props: SidebarButtonProps) => {
  if (props.variant === "accordion") {
    return (
      <Accordion type="single" collapsible className="w-full p-0">
        <AccordionItem value="item-1">
          <AccordionTrigger className="border-none bg-transparent">
            <div className="flex gap-3">
              {props.trigger.icon}

              <p className="text-muted-foreground">{props.trigger.title}</p>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <SidebarButton>{props.content}</SidebarButton>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  if (props.variant === "button") {
    return <SidebarButton>{props.children}</SidebarButton>;
  }

  return null;
};

export default SidebarItem;
