import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AlertProps {
  variant?: "default" | "destructive";
  children: ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = "default",
  children,
  className,
}) => {
  const baseStyles = "border-l-4 p-4 mb-4 rounded-md text-sm";
  const variantStyles =
    variant === "destructive"
      ? "bg-red-100 border-red-500 text-red-700"
      : "bg-gray-100 border-gray-500 text-gray-700";

  return (
    <div className={cn(baseStyles, variantStyles, className)}>{children}</div>
  );
};
