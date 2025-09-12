import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import MenProducts from "@/components/MenProducts";
import { categories } from "../../api/men/menCateogryData";
import { menInnerwear as productsData } from "../../api/men/menProductsData";
import MenHero from "@/components/MenHero";
import Container from "@/components/Container";
import images from "@/assets/men/images";
import MenProductCategories from "@/components/MenProductCategories";

const MenPage = () => {
  const location = useLocation();

  // Render default sections only if we're on the main /mens page
  const isDefaultPage = location.pathname === "/mens";

  return (
    <Container>
      {/* Nested route content will render here */}
      <Outlet />

      {/* Default content for /mens */}
      {isDefaultPage && (
        <>
          {/* Hero Section */}
          <MenHero images={images} />

          {/* Product Categories */}
          <MenProductCategories
            title="Effortless Comfort, Perfect Fit"
            description="Modern, product-focused tagline"
            categories={categories}
          />

          {/* Trending Products */}
          <MenProducts
            productsData={productsData.filter(
              (product) => product.tag !== "Premium"
            )}
            title="Handpicked For You"
            description="Personalization ka touch, especially for logged-in users"
          />

          {/* Premium Products */}
          <MenProducts
            productsData={productsData.filter((product) =>
              product.tag?.includes("Premium")
            )}
            title="👑 Premium Choices"
            description="High-quality picks crafted for your ultimate satisfaction"
          />

          {/* Essential Products */}
          <MenProducts
            productsData={productsData.filter(
              (product) =>
                (product.category === "men-trunks" ||
                  product.category === "men-briefs") &&
                product.tag?.includes("Premium")
            )}
            title="Essentials Journal"
            description="Focuses on everyday wear elevated"
          />
        </>
      )}

      {/* Sidebar (always visible) */}
      <Sidebar />
    </Container>
  );
};

export default MenPage;
