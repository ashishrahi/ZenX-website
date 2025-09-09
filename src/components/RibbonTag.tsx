import React from "react";
import { cn } from "@/lib/utils";

interface RibbonTagProps {
  label: string;
  color?: string;
  className?: string;
}

const RibbonTag: React.FC<RibbonTagProps> = ({
  label,
  color = "bg-red-800",
  className,
}) => {
  return (
    <div
      className={cn(
        "absolute top-4 -left-3 z-50 flex flex-col items-center",
        className
      )}
    >
      {/* Ribbon Main Block */}
      <div
        className={cn(
          `${color} text-white text-xs font-semibold px-2 py-2 shadow-md`,
          "flex justify-center items-center h-20 w-6"
        )}
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)",
          letterSpacing: "0.5px",
          borderRadius: "3px",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default RibbonTag;
