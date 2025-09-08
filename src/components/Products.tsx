import { useParams, useNavigate } from "react-router-dom";
import { allProducts } from "../api/productsData";
import { Package } from "lucide-react";
import { Button } from "./ui/button";
import EmptyState from "./EmptyState";

const CategoryProductsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Filter products by category slug
  const filteredProducts = allProducts.filter(product => product.category === slug);

  const handleViewDetails = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 pt-48 pb-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold capitalize mb-4">{slug?.replace("-", " ")}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our premium {slug?.replace("-", " ")} collection. High-quality products with perfect design for your needs.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
            >
              <img
                src={product.images.Burgundy[0]}
                alt={product.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-red-600 font-bold mb-4">₹{product.price}</p>
                <p className="text-gray-700 font-semibold mb-2">Sizes:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {size}
                    </span>
                  ))}
                </div>


                <button
                  className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-800 transition"
                  onClick={() => handleViewDetails(product.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
       <EmptyState
        title="No Products Found"
        description="We couldn't find any products in this category. Browse our catalog to explore other options."
        action={
          <Button
            className="bg-red-600 text-white hover:bg-red-700 transition"
            onClick={() => navigate("/")}
          >
            Browse Categories
          </Button>
        }
      />
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
