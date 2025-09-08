import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetails from "../../components/ProductDetails";
import RelatedProducts from "../../components/RelatedProduct";
import { allProducts } from "../../api/productsData";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const product = allProducts.find(p => p.id === Number(id));
      setCurrentProduct(product);

      if (product) {
        // Filter related products by category (excluding current product)
        const related = allProducts.filter(
          p => p.category === product.category && p.id !== product.id
        );
        setRelatedProducts(related);
      }
    }
  }, [id]);

  return (
    <div className="container mx-auto px-4 pt-48 pb-12 space-y-12">
      {currentProduct && <ProductDetails product={currentProduct} />}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetailPage;
