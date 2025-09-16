// types.ts
export interface Breadcrumb {
  readonly label: string;  // Text to show
  readonly path: string;   // URL path
}


export interface BreadcrumbsContextType {
  breadcrumbs: readonly Breadcrumb[];
  setBreadcrumbs: (crumbs: ((prev: readonly Breadcrumb[]) => readonly Breadcrumb[]) | readonly Breadcrumb[]) => void;
  addBreadcrumb: (crumb: Breadcrumb) => void;
  resetBreadcrumbs: () => void;
}