// src/components/ui/AppButton.tsx
import React, { FC, ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const AppButton: FC<AppButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  ...props
}) => {
  const baseClass =
    "rounded-xl font-medium transition-colors duration-300 shadow-md hover:shadow-lg";

  const sizeClass = {
    small: "py-2 px-4 text-sm",
    medium: "py-3 px-6 text-base",
    large: "py-4 px-8 text-lg",
  }[size];

  const variantClass =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary/90"
      : "bg-gray-400 text-white cursor-not-allowed";

  return (
    <Button className={`${baseClass} ${sizeClass} ${variantClass}`} {...props}>
      {children}
    </Button>
  );
};

export default AppButton;
