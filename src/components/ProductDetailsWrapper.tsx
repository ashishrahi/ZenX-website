// components/ProductDetailsWrapper.tsx
import { useProduct } from "@/hooks/Products";
import AppProductDetails from "./AppProductDetails";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a skeleton component

interface ProductDetailsWrapperProps {
  slug: string;
}

const ProductDetailsWrapper: React.FC<ProductDetailsWrapperProps> = ({ slug }) => {
  const { data: product, isLoading, error } = useProduct(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen py-1 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image skeleton */}
            <div className="lg:w-1/2">
              <Skeleton className="w-full h-[500px] rounded-lg" />
            </div>
            {/* Details skeleton */}
            <div className="lg:w-1/2 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive">Error loading product</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Product not found</h2>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <AppProductDetails product={product} />;
};

export default ProductDetailsWrapper;