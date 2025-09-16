import { cn } from "@/lib/utils";
import { RibbonTagProps } from "@/types/RibbonTagProps";

export default function BestsellerTag({ label }: RibbonTagProps) {
  return (
    <div className="relative inline-block">
      <div className={cn(
        "bg-gray-900 text-white text-xs font-bold uppercase tracking-wider",
        "px-3 py-1.5 rounded-md",
        "flex items-center justify-center",
        "shadow-md"
      )}>
       {label}
      </div>
      
      <div className="absolute top-0 -left-1 w-2 h-2 overflow-hidden">
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-900 transform rotate-45"></div>
      </div>
      
      <div className="absolute top-0 -right-1 w-2 h-2 overflow-hidden">
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-gray-900 transform rotate-45"></div>
      </div>
    </div>
  );
}