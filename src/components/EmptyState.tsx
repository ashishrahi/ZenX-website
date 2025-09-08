import { Package } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title = "No products available",
  description = "Try selecting a different category or check back later.",
  icon = <Package className="w-12 h-12 text-gray-400 mb-4" />,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`col-span-full flex flex-col items-center justify-center py-16 ${className}`}
    >
      {icon}
      <h3 className="text-gray-700 text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-base text-center max-w-md mb-4">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
