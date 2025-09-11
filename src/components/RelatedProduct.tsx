import React from "react";
import ProductCard from "./ProductCard"; // make sure the path is correct
import { Product } from "../types/productTypes"; // if you have a shared Product type

interface RelatedProductsProps {
  products: Product[];
  onAddToBag?: (productId: number) => void;
  onWishlistToggle?: (productId: number) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  onAddToBag,
  onWishlistToggle,
}) => {
  if (products.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToBag={onAddToBag}
            onWishlistToggle={onWishlistToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
