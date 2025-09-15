// src/components/ui/AppButton.tsx
import React, { FC, ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

const AppButton: FC<AppButtonProps> = ({ children, variant = "primary", ...props }) => {
  const baseClass =
    "w-full py-3 rounded-xl font-medium transition-colors duration-300 shadow-md hover:shadow-lg";

  const variantClass =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary/90"
      : "bg-gray-400 text-white cursor-not-allowed";

  return (
    <Button className={`${baseClass} ${variantClass}`} {...props}>
      {children}
    </Button>
  );
};

export default AppButton;
