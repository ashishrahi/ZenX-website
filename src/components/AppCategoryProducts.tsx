import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Button } from "./ui/button";
import EmptyState from "./EmptyState";
import AppProductCard from "./AppProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
}

interface AppCategoryProductsProps {
  productsData: Product[];
  title?: string;
  description?: string;
}

const AppCategoryProducts = ({
  productsData,
  title,
  description,
}: AppCategoryProductsProps) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // State for filtering and sorting
  const [sortOption, setSortOption] = useState<string>("default");
  const [priceFilter, setPriceFilter] = useState<string>("all");

  // Load More functionality
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const loadMoreStep = 8;

  // Filter products by category slug
  const categoryProducts = productsData.filter(
    (product) => product.category === slug
  );

  // Apply sorting and filtering
  const filteredProducts = useMemo(() => {
    let products = [...categoryProducts];

    // Filter by price
    if (priceFilter === "under50") {
      products = products.filter((p) => p.price < 50);
    } else if (priceFilter === "50to100") {
      products = products.filter((p) => p.price >= 150 && p.price <= 500);
    } else if (priceFilter === "above100") {
      products = products.filter((p) => p.price > 1000);
    }

    // Sort by selected option
    if (sortOption === "priceLowHigh") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortOption === "nameAZ") {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "nameZA") {
      products.sort((a, b) => b.name.localeCompare(a.name));
    }

    return products;
  }, [categoryProducts, sortOption, priceFilter]);

  const handleAddToBag = (productId: number) => {
    console.log("Added to Bag:", productId);
  };

  const handleWishlistToggle = (productId: number) => {
    console.log("Wishlist toggled for:", productId);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + loadMoreStep);
  };

  return (
    <div className="container mx-auto px-4 pt-12 pb-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold capitalize text-gray-900 tracking-tight mb-4">
          {title || slug?.replace("-", " ")}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          {description ||
            `Discover premium ${slug?.replace(
              "-",
              " "
            )} styles crafted for comfort, elegance, and timeless appeal.`}
        </p>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex justify-between mb-8">
        <div>
          <label className="mr-2 font-medium">Sort By:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="default">Default</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="nameAZ">Name: A-Z</option>
            <option value="nameZA">Name: Z-A</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium">Filter By Price:</label>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="under50">Under 50</option>
            <option value="50to100">150 - 500</option>
            <option value="above100">Above 1000</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, visibleCount).map((product) => (
            <AppProductCard
              key={product.id}
              product={product}
              onAddToBag={handleAddToBag}
              onWishlistToggle={handleWishlistToggle}
            />
          ))
        ) : (
          <EmptyState
            title="No Products Found"
            description="We couldn't find any products in this category. Browse our catalog to explore other options."
            action={
              <Button
                className="bg-black text-white hover:bg-gray-800 transition-colors duration-300"
                onClick={() => navigate("/")}
              >
                Browse Categories
              </Button>
            }
          />
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-8">
          <Button
            className="bg-black text-white hover:bg-gray-800 transition-colors duration-300"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppCategoryProducts;
