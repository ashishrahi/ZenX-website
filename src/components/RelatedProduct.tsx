import React from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  if (products.length === 0) return null;
  console.log('products', products)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="border rounded-xl overflow-hidden shadow hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
          >
            <img
              src={product.images.Burgundy[0]}
             alt={product.name}
                className="w-full h-48 object-contain"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-medium text-lg text-gray-800">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
