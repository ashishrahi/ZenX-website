import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MenProductDetails from "../../../components/MenProductDetails";
import MenProductCard from "@/components/MenProductCard";
import Comments, { Comment } from "@/components/Comments"; // Import Comments component
import { menInnerwear } from "../../../api/men/menProductsData";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  brand?: string;
  tags?: string[];
  colors?: string[];
  images?: Record<string, string[]>;
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Sample initial comments
  const [initialComments, setInitialComments] = useState<Comment[]>([
    { id: 1, author: "John Doe", content: "Amazing product!" },
    { id: 2, author: "Jane Smith", content: "Loved it, highly recommend." },
  ]);

  useEffect(() => {
    if (!id) return;

    const selectedProduct =
      menInnerwear.find((product) => product.id === Number(id)) || null;
    setCurrentProduct(selectedProduct);

    if (selectedProduct) {
      const related = menInnerwear.filter(
        (product) =>
          product.category === selectedProduct.category &&
          product.id !== selectedProduct.id
      );
      setRelatedProducts(related);
    }
  }, [id]);

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-20 md:pt-28 pb-12">
        {currentProduct ? (
          <>
            {/* Product Details */}
            <section
              aria-labelledby="product-details"
              className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16"
            >
              <div className="flex-1 min-w-0 rounded-2xl shadow-md p-6">
                <MenProductDetails product={currentProduct} />
              </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <section aria-labelledby="related-products" className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((product) => (
                    <MenProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Comments Section */}
            <section aria-labelledby="product-comments" className="mb-16">
              <Comments initialComments={initialComments} />
            </section>
          </>
        ) : (
          <div className="text-center py-28">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Product Not Found
            </h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              The product you are looking for does not exist, has been removed,
              or is temporarily unavailable.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
