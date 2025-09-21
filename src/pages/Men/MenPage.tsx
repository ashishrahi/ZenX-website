import Container from "@/components/Container";
import ShadowContainer from "@/components/ShadowContainer";
import AppHeroBanner from "@/components/AppHeroBanner";
import AppProductCategoriesCarousel from "@/components/AppProductCategoriesCarousel";
import AppProductCarousel from "@/components/AppProductCarousel";
import images from "@/assets/men/images";
import { useSubcategories } from "@/hooks/Subcategories";
import { useProducts } from "@/hooks/Products";

const MenPage = () => {
  const { data: subcategories } = useSubcategories();
  const { data: productsData } = useProducts();

  // Filter products by slug if slug exists
  const filteredProducts = productsData?.filter((product) => product.category === "men");

  return (
    <Container>
      <div className="flex-1 space-y-8">
        {/* Hero Section */}
        <AppHeroBanner image={images.menBanner} />

        {/* Product Categories */}
        <ShadowContainer>
          <AppProductCategoriesCarousel
            title="Effortless Comfort, Perfect Fit"
            description="Modern, product-focused tagline"
            categories={subcategories ?? []} // optional chaining with fallback
          />
        </ShadowContainer>

        {/* Trending Products */}
        <ShadowContainer>
          <AppProductCarousel
            productsData={filteredProducts ?? []} // optional chaining with fallback
            title="Handpicked For You"
            description="Personalization ka touch, especially for logged-in users"
          />
        </ShadowContainer>

        {/* Premium Products */}
        <ShadowContainer>
          <AppProductCarousel
            productsData={filteredProducts ?? []} // optional chaining with fallback
            title="Premium Choices"
            description="High-quality picks crafted for your ultimate satisfaction"
          />
        </ShadowContainer>

        {/* Essential Products */}
        <ShadowContainer>
          <AppProductCarousel
            productsData={filteredProducts ?? []} // optional chaining with fallback
            title="Essentials Journal"
            description="Focuses on everyday wear elevated"
          />
        </ShadowContainer>
      </div>
    </Container>
  );
};

export default MenPage;
