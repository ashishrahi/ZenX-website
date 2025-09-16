export const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean); // ["men", "trending"]
  const breadcrumbs = [{ label: "Home", path: "/" }];

  let cumulativePath = "";
  segments.forEach(segment => {
    cumulativePath += `/${segment}`;
    breadcrumbs.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1), // capitalize
      path: cumulativePath,
    });
  });

  return breadcrumbs;
};
