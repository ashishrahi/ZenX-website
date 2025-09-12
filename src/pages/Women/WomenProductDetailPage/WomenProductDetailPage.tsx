import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetails from "../../../components/WomenProductDetails";
import RelatedProducts from "../../../components/RelatedProduct";
import { womenInnerwear } from "../../../api/women/womenProductsData";

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

const WomemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!id) return;

    // Find current product
    const selectedProduct =
      womenInnerwear.find((product) => product.id === Number(id)) || null;
    setCurrentProduct(selectedProduct);

    // Find related products
    if (selectedProduct) {
      const related = womenInnerwear.filter(
        (product) =>
          product.id !== selectedProduct.id &&
          (product.category === selectedProduct.category ||
           product.brand === selectedProduct.brand ||
           product.tags?.some((tag) =>
             selectedProduct.tags?.includes(tag)
           ))
      );
      setRelatedProducts(related);
    } else {
      setRelatedProducts([]);
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
                <ProductDetails product={currentProduct} />
              </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <section aria-labelledby="related-products" className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    id="related-products"
                    className="text-2xl md:text-3xl font-bold text-gray-800"
                  >
                    Related Products
                  </h2>
                  <span className="text-gray-500 text-sm">
                    {relatedProducts.length} items
                  </span>
                </div>

                {/* Render all related products in one component */}
                <RelatedProducts products={relatedProducts} />
              </section>
            )}
          </>
        ) : (
          /* Product Not Found */
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

export default WomemDetailPage;
