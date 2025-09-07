import { useParams, useNavigate } from "react-router-dom";

const CategoryProductsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Static product data
  const allProducts = [
    { id: 1, name: "Classic Trunk", price: 499, image: "/images/trunks1.webp", category: "trunks", description: "High-quality classic trunk." },
    { id: 2, name: "Premium Trunk", price: 699, image: "/images/trunks2.webp", category: "trunks", description: "Premium trunk for comfort." },
    { id: 3, name: "Sporty Gym Vest", price: 299, image: "/images/gymvest1.webp", category: "gyms-vests", description: "Lightweight sporty gym vest." },
    { id: 4, name: "Comfort Gym Vest", price: 399, image: "/images/gymvest2.webp", category: "gyms-vests", description: "Comfortable gym vest for workouts." },
    { id: 5, name: "Kids T-Shirt", price: 249, image: "/images/kids1.webp", category: "kids-wear", description: "Soft cotton t-shirt for kids." },
    { id: 6, name: "Kids Hoodie", price: 599, image: "/images/kids2.webp", category: "kids-wear", description: "Warm hoodie for kids." },
    { id: 7, name: "Winter Jacket", price: 999, image: "/images/winter1.webp", category: "winter-wear", description: "Thick winter jacket." },
    { id: 8, name: "Woolen Sweater", price: 799, image: "/images/winter2.webp", category: "winter-wear", description: "Cozy woolen sweater." },
  ];

  // Filter products by category slug
  const filteredProducts = allProducts.filter(product => product.category === slug);

  const handleViewDetails = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 pt-28 pb-12">
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
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-red-600 font-bold mb-4">₹{product.price}</p>
                <button
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => handleViewDetails(product.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">
            No products available for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
