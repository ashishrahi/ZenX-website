import { Link } from "react-router-dom";
import { useBreadcrumbs } from "@/context/BreadcrumbsContext";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const GlobalBreadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();

  if (!breadcrumbs.length) return null;

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <BreadcrumbItem key={`${crumb.path}-${crumb.label}`}>
              {!isLast ? (
                <BreadcrumbLink asChild>
                  <Link to={crumb.path}>{crumb.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default GlobalBreadcrumbs;
