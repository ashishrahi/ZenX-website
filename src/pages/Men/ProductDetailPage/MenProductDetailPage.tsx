import { useParams } from "react-router-dom";
import { useState } from "react";
import AppProductDetails from "@/components/AppProductDetails";
import AppProductCard from "@/components/AppProductCard";
import Comments, { Comment } from "@/components/Comments";
import { useProduct } from "@/hooks/Products";

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

const MenProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug);

  const [initialComments, setInitialComments] = useState<Comment[]>([
    { id: 1, author: "John Doe", content: "Amazing product!" },
    { id: 2, author: "Jane Smith", content: "Loved it, highly recommend." },
  ]);

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-20 md:pt-28 pb-12">
        {isLoading ? (
          <div className="text-center py-28">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Loading Product...
            </h2>
          </div>
        ) : product ? (
          <>
            {/* Product Details */}
            <section
              aria-labelledby="product-details"
              className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16"
            >
              <div className="flex-1 min-w-0 rounded-2xl shadow-md p-6">
                <AppProductDetails product={product} />
              </div>
            </section>

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

export default MenProductDetailPage;
